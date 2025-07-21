import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import SelectGroupMember from "./SelectGroupMember"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import LoadingButton from "@/utils/LoadingButton"
import { Skeleton } from "@/components/ui/skeleton"
import { CreateWorkspaceGroupApi } from "@/service/workspace.group.service"
import { AlertCircle } from "lucide-react"
import { GetWorkspaceReadersApi } from "@/service/teammate.service"

const groupSchema = z.object({
    groupName: z
        .string()
        .min(3, "Group name must be at least 3 characters"),
});

export default function CreateGroupDialog({ setGroups }) {
    const [isOpen, setIsOpen] = useState(false);
    const [readers, setReaders] = useState([]);
    const [selectedReaders, setSelectedReaders] = useState([]);
    const [isLoadingReaders, setIsLoadingReaders] = useState(false);
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const [hasAcceptedReaders, setHasAcceptedReaders] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(groupSchema)
    });

    useEffect(() => {
        if (isOpen) {
            fetchReaders();
        } else {
            reset();
            setSelectedReaders([]);
        }
    }, [isOpen, reset]);

    const fetchReaders = async () => {
        try {
            setIsLoadingReaders(true);
            const response = await GetWorkspaceReadersApi();
            const allReaders = response.data;

            const acceptedReaders = allReaders.filter(reader => reader.isAccepted === true);

            // Set flag if there are no accepted readers
            setHasAcceptedReaders(acceptedReaders.length > 0);

            const formattedReaders = acceptedReaders.map(reader => ({
                value: reader._id,
                label: reader.name
            }));
            setReaders(formattedReaders);
        } catch (error) {
            toast.error("Failed to fetch readers", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoadingReaders(false);
        }
    };

    const onSubmit = async (data) => {
        if (selectedReaders.length === 0) {
            toast.error("Selection required", {
                description: "Please select at least one group member",
            });
            return;
        }

        try {
            setIsCreatingGroup(true);
            const response = await CreateWorkspaceGroupApi({
                name: data.groupName,
                readerIds: selectedReaders
            });

            setGroups(prevGroups => [...prevGroups, response.data]);

            toast.success("Group created", {
                description: response.message,
            });

            reset();
            setSelectedReaders([]);
            setIsOpen(false);
        } catch (error) {
            toast.error("Failed to create group", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsCreatingGroup(false);
        }
    };

    const filters = [
        {
            id: 'members',
            options: readers,
            selectedValues: selectedReaders,
            onChange: setSelectedReaders
        }
    ];

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    New group
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Create a new group</DialogTitle>
                        <DialogDescription>
                            Organize your readers into groups for easy sharing.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 py-4">
                        <Label htmlFor="groupName" className={`text-sm font-medium ${errors.groupName ? "text-red-500" : ""}`}>
                            Group name
                        </Label>
                        <Input
                            id="groupName"
                            placeholder="e.g Marketing (min 3 characters)"
                            className={errors.groupName ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                            {...register("groupName")}
                        />
                        {errors.groupName && (
                            <p className="text-red-500 text-xs mt-1">{errors.groupName.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="members" className="text-sm font-medium">
                            Add group members
                        </Label>

                        {isLoadingReaders ? (
                            <div className="space-y-2">
                                <Skeleton className="h-10 w-full rounded" />
                            </div>
                        ) : !hasAcceptedReaders ? (
                            <div className="flex space-x-2 p-3 text-sm bg-amber-50 text-amber-800 border border-amber-200 rounded-md">
                                <AlertCircle />
                                <p>No accepted readers found. Please invite readers and ensure they accept your invitation first.</p>
                            </div>
                        ) : (
                            filters.map((filter) => (
                                <SelectGroupMember
                                    key={filter.id}
                                    options={filter.options}
                                    selectedValues={filter.selectedValues}
                                    value={filter.value}
                                    onChange={filter.onChange}
                                />
                            ))
                        )}
                    </div>
                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={isCreatingGroup}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isCreatingGroup || isLoadingReaders || !hasAcceptedReaders}
                        >
                            {isCreatingGroup ? (
                                <>
                                    <LoadingButton />
                                </>
                            ) : 'Create group'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}