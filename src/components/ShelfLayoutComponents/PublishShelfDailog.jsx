import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, ListX } from 'lucide-react'
import { useState } from 'react'
import { toast } from "sonner"
import { CreateBookShelfApi } from "@/service/bookshelf.service"
import { useShelfCreate } from "@/layout/ShelfCreateLayout"
import LoadingButton from "@/utils/LoadingButton"
import { useNavigate } from "react-router-dom"

export default function PublishShelfDailog({ isPublishShelfModalOpen, setIsPublishShelfModalOpen }) {
    const [activeTab, setActiveTab] = useState("public")
    const [title, setTitle] = useState("New flipbook")
    const [description, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const { orderedFlipbooks,setOrderedFlipbooks,setSelectedFlipbooks } = useShelfCreate()

    const isPublishDisabled = !title.trim() || orderedFlipbooks.length === 0

    const handlePublish = async () => {
        setIsLoading(true)
        try {
            const payload = {
                name: title.trim(),
                description: description.trim(),
                isVisible: activeTab === "public",
                flipbookPublishIds: orderedFlipbooks.map(fb => fb._id)
            }
            const response = await CreateBookShelfApi(payload)
            toast.success("Bookshelf published successfully!", {
                description: response.message
            })
            setIsPublishShelfModalOpen(false)
        } catch (error) {
            toast.error("Failed to publish bookshelf", {
                description: error.message
            })
        } finally {
            setIsLoading(false)
            setTitle("New flipbook")
            setDescription("")
            setActiveTab("public")
            setOrderedFlipbooks([]) 
            setSelectedFlipbooks([])
            navigate("/myflipbooks")
        }
    }

    return (
        <div className="p-8">
            <Dialog open={isPublishShelfModalOpen} onOpenChange={setIsPublishShelfModalOpen}>
                <DialogContent className="sm:max-w-[540px] w-[90vw]">
                    <DialogHeader>
                        <DialogTitle>Publish your work</DialogTitle>
                        <DialogDescription className="sr-only">
                            Description
                        </DialogDescription>
                    </DialogHeader>

                    <div className="px-1 max-h-[calc(100vh-300px)] overflow-y-auto">
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">
                                    Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={!title.trim() ? 'border-red-500 focus:outline-none focus-visible:ring-0' : ''}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Use a maximum of 256 character"
                                    className="resize-none"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    maxLength={256}
                                />
                            </div>
                        </div>

                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="public">
                                    <Globe className="w-4 h-4 mr-2 hidden md:block" /> Public
                                </TabsTrigger>
                                <TabsTrigger value="unlisted">
                                    <ListX className="w-4 h-4 mr-2 hidden md:block" /> Unlisted
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="public">
                                <p className="text-sm font-medium text-gray-600 my-4">
                                    Your catalog will appear on your public Flipnova profile and it will be indexed
                                    by the search engines (Google, Bing, etc).
                                </p>
                            </TabsContent>

                            <TabsContent value="unlisted">
                                <p className="text-sm font-medium text-gray-600 my-4">
                                    Your catalog will not appear anywhere on the web.
                                    Only people you personally share the direct link with will have access to your catalog.
                                </p>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPublishShelfModalOpen(false)}>
                            Close
                        </Button>
                        <Button
                            disabled={isPublishDisabled || isLoading}
                            onClick={handlePublish}
                        >
                            {isLoading ? <LoadingButton /> : "Publish Now"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}