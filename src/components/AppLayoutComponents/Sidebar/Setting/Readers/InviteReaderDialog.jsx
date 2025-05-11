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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { useState } from "react"
import { AddReaderApi } from "@/service/workspace.reader.service"
import LoadingButton from "@/utils/LoadingButton"

const inviteSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export default function InviteReaderDialog({setReaders}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(inviteSchema)
    });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await AddReaderApi(data);
            toast.success("Invitation sent", {
                description: `Invite has been sent to ${data.email}`,
            });
            setReaders(prev => [...prev, response.data]);
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
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    Add reader
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] w-[90vw]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Add user</DialogTitle>
                        <DialogDescription className="sr-only">
                            Invite a user as a reader
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 py-4">
                        <Label htmlFor="email" className={`text-sm font-medium ${errors.email ? "text-red-500" : ""}`}>
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="user@example.com"
                            className={errors.email ? "border-red-500 focus:outline-none focus-visible:ring-0" : ""}
                            {...register("email")}
                        />
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
                        <Button type="submit" disabled={isLoading || errors.email}>
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