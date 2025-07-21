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
import { UpdateWorkspaceGroupApi } from "@/service/workspace.group.service"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import LoadingButton from "@/utils/LoadingButton"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Pencil } from "lucide-react"
import { GetWorkspaceReadersApi } from "@/service/teammate.service"

const groupSchema = z.object({
    groupName: z
        .string()
        .min(3, "Group name must be at least 3 characters"),
});

export default function EditGroupDialog({ group,setGroups }) {
    const [isOpen, setIsOpen] = useState(false);
    const [readers, setReaders] = useState([]);
    const [selectedReaders, setSelectedReaders] = useState([]);
    const [isLoadingReaders, setIsLoadingReaders] = useState(false);
    const [isUpdatingGroup, setIsUpdatingGroup] = useState(false);
    const [hasAcceptedReaders, setHasAcceptedReaders] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        resolver: zodResolver(groupSchema),
        defaultValues: {
            groupName: group?.name || ""
        }
    });

    useEffect(() => {
        if (isOpen) {
            fetchReaders();
            // Set initial form values
            setValue("groupName", group?.name || "");
            
            // Set selected readers from group
            if (group?.readerIds && Array.isArray(group.readerIds)) {
                const initialSelectedReaders = group.readerIds.map(reader => reader._id);
                setSelectedReaders(initialSelectedReaders);
            }
        } else {
            reset();
        }
    }, [isOpen, group, setValue, reset]);

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
                label: reader.name || reader.email
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
            setIsUpdatingGroup(true);
            
            const updateData = {
                groupId: group._id,
                name: data.groupName,
                readerIds: selectedReaders
            };

            const response = await UpdateWorkspaceGroupApi(updateData);

            // replace whole group with updated group

            setGroups(prevGroups => prevGroups.map(g => g._id === group._id ? response.data : g));

            toast.success("Group updated", {
                description: response.message || "Group updated successfully",
            });

            setIsOpen(false);
        } catch (error) {
            toast.error("Failed to update group", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsUpdatingGroup(false);
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
                <Button variant="ghost" size="sm"><Pencil /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Edit group</DialogTitle>
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
                            disabled={isUpdatingGroup}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isUpdatingGroup || isLoadingReaders || !hasAcceptedReaders}
                        >
                            {isUpdatingGroup ? (
                                <>
                                    <LoadingButton />
                                </>
                            ) : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}