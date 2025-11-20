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
import SelectRole from "./SelectRole"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { GetUserRolesApi } from "@/service/user.role.service"
import LoadingButton from "@/utils/LoadingButton"
import { AddTeammateApi } from "@/service/teammate.service"

const inviteSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    userRole: z
        .string()
        .min(1, "Role is required")
});

export default function InviteTeammateDialog({ setTeammates }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const [isLoadingRoles, setIsLoadingRoles] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm({
        resolver: zodResolver(inviteSchema),
        defaultValues: {
            email: "",
            userRole: ""
        }
    });

    const selectedRole = watch("userRole");

    useEffect(() => {
        const fetchUserRoles = async () => {
            try {
                setIsLoadingRoles(true);
                const response = await GetUserRolesApi();
                setRoles(response.data || []);
            } catch (error) {
                toast.error("Failed to fetch user roles", {
                    description: error.message || "Oops! Something went wrong.",
                });
            } finally {
                setIsLoadingRoles(false);
            }
        };

        fetchUserRoles();
    }, []);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await AddTeammateApi(data);
            toast.success("Invitation sent", {
                description: `Invite has been sent to ${data.email}`,
            });
            if (setTeammates) {
                setTeammates(prev => [...prev, response.data]);
            }
            reset();
            setIsOpen(false);
        } catch (error) {
            toast.error("Failed to send invitation", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRoleChange = (roleId) => {
        setValue("userRole", roleId, { shouldValidate: true });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    Add teammate
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Add teammate</DialogTitle>
                        <DialogDescription className="sr-only">
                            Invite a user as a teammate
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="email" className={`text-sm font-medium ${errors.email ? "text-red-500" : ""}`}>
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="user@example.com"
                                className={errors.email ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role" className={`text-sm font-medium ${errors.userRole ? "text-red-500" : ""}`}>
                                Select a role
                            </Label>
                            <SelectRole 
                                roles={roles} 
                                isLoading={isLoadingRoles} 
                                selectedRole={selectedRole}
                                onRoleChange={handleRoleChange}
                                error={errors.userRole}
                            />
                            {errors.userRole && (
                                <p className="text-xs text-red-500">{errors.userRole.message}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                reset();
                                setIsOpen(false);
                            }}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={isLoading || isLoadingRoles || Object.keys(errors).length > 0}
                        >
                            {isLoading ? (
                                <>
                                    <LoadingButton />
                                </>
                            ) : 'Send invite'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}