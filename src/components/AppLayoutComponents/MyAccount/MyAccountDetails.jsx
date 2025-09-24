import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { UpdateProfileApi } from "@/service/auth.service";
import { Image, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import LoadingButton from "@/utils/LoadingButton";

const profileUpdateSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    profilePicture: z.any().optional()
});

export default function MyAccountDetails() {
    const { userMeta, updateUserMeta } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    console.log("userMeta in MyAccountDetails:", userMeta);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            firstName: userMeta?.firstName || "",
            lastName: userMeta?.lastName || "",
            profilePicture: null
        }
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error("Please select a valid image file");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size should be less than 5MB");
                return;
            }

            setSelectedFile(file);
            setValue("profilePicture", file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("firstName", data.firstName);
            formData.append("lastName", data.lastName);
            
            if (selectedFile) {
                formData.append("profilePicture", selectedFile);
            }

            const response = await UpdateProfileApi(formData);
            
            if (updateUserMeta) {
                updateUserMeta({
                    ...userMeta,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    profileImage: response.data.profilePicture
                });
            }

            toast.success("Profile updated successfully", {
                description: response.message || "Your profile has been updated."
            });

            setSelectedFile(null);
            setPreviewUrl(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error) {
            toast.error("Failed to update profile", {
                description: error.message || "Something went wrong. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getProfileImage = () => {
        if (previewUrl) {
            return previewUrl;
        }
        if (userMeta?.profileImage) {
            return userMeta.profileImage;
        }
        return null;
    };

    const hasProfileImage = getProfileImage();

    return (
        <div className="max-w-[100vw] overflow-auto space-y-4 h-full flex flex-col">
            <div className="p-6 bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg">
                <h1 className="text-2xl font-bold mb-2">Account details</h1>
                <p className="text-gray-500">View and update your account information.</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Edit your account image and name</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Account image</Label>
                            <div className="flex items-center gap-4">
                                <div className="flex shrink-0 p-2 overflow-hidden justify-center items-center size-20 border-2 border-dotted border-gray-300 text-gray-400 rounded-full dark:border-neutral-700 dark:text-neutral-600">
                                    {hasProfileImage ? (
                                        <img 
                                            src={getProfileImage()} 
                                            className="w-auto h-auto max-w-[76px] max-h-[76px] object-cover rounded-full" 
                                            alt="Profile" 
                                        />
                                    ) : (
                                        <Image />
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <Button 
                                        type="button"
                                        variant="outline" 
                                        size="sm"
                                        onClick={handleUploadClick}
                                    >
                                        <Upload size={14} className="mr-2" />
                                        {hasProfileImage ? "Change photo" : "Add image"}
                                    </Button>
                                    {hasProfileImage && (
                                        <p className="text-xs text-gray-500">
                                            Click to change your profile photo
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="firstName">
                                First name
                            </Label>
                            <Input 
                                id="firstName"
                                placeholder="Your first name" 
                                defaultValue={userMeta?.firstName || ""}
                                className={`md:w-[25%] ${errors.firstName ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                {...register("firstName")}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName">
                                Last name
                            </Label>
                            <Input 
                                id="lastName"
                                placeholder="Your last name" 
                                defaultValue={userMeta?.lastName || ""}
                                className={`md:w-[25%] ${errors.lastName ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}`}
                                {...register("lastName")}
                            />
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="min-w-[120px]"
                        >
                            {isLoading ? <LoadingButton /> : "Save changes"}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}