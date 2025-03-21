import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Lock, ListX, LockKeyhole, X, Pencil } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react";
import ReaderSelection from "../Sidebar/Home/MyFlipbooks/ReaderSelection";
export default function ChangeVisibilityDialog() {
    const [selectedRadio, setSelectedRadio] = useState("email");
    const [emailInput, setEmailInput] = useState("");
    const [createdByFilter, setCreatedByFilter] = useState([]);
    const [addedEmails, setAddedEmails] = useState([
        "bvxx@xx.com",
        "sgxx@xx.com",
        "upxx@xx.com",
        "nsxx@xx.com",
        "ppxx@xx.com",
        "psxx@xx.com",
        "snxx@xx.com"
    ]);

    const handleRadioChange = (value) => {
        setSelectedRadio(value);
    };

    const handleAddEmail = () => {
        if (emailInput.trim() && !addedEmails.includes(emailInput)) {
            setAddedEmails([...addedEmails, emailInput]);
            setEmailInput("");
        }
    };

    const handleRemoveEmail = (emailToRemove) => {
        setAddedEmails(addedEmails.filter(email => email !== emailToRemove));
    };

    const filters = [
        {
            id: 'createdBy',
            options: [
                { value: 'bhavinv', label: 'BhavinV' },
                { value: 'satyamg', label: 'SatyamG' },
                { value: 'utsavp', label: 'UtsavP' },
                { value: 'nirav', label: 'Nirav' },
                { value: 'parth', label: 'Parth' },
                { value: 'pratik', label: 'Pratik' },
            ],
            selectedValues: createdByFilter,
            onChange: setCreatedByFilter
        }
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Change visibility</DialogTitle>
                    <DialogDescription className="sr-only">
                        Description
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="public">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="public">
                            <Globe className="w-4 h-4 mr-2 hidden md:block" /> Public
                        </TabsTrigger>
                        <TabsTrigger value="unlisted" disabled>
                            <ListX className="w-4 h-4 mr-2 hidden md:block" /> Unlisted
                        </TabsTrigger>
                        <TabsTrigger value="passwordLocked">
                            <LockKeyhole className="w-4 h-4 mr-2 hidden md:block" /> Locked
                        </TabsTrigger>
                        <TabsTrigger value="private">
                            <Lock className="w-4 h-4 mr-2 hidden md:block" /> Private
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="public">
                        <p className="text-sm font-medium text-gray-600 my-4">Your catalog will appear on your public Flipnova profile and it will be indexed
                            by the search engines (Google, Bing, etc).</p>
                    </TabsContent>

                    <TabsContent value="unlisted">
                        <p className="text-sm font-medium text-gray-600">Your catalog will not appear anywhere on the web.
                            Only people you personally share the direct link with will have access to your catalog.</p>
                    </TabsContent>

                    <TabsContent value="passwordLocked">
                        <div className="grid gap-2 my-4">
                            <Label htmlFor="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                placeholder="Enter password"
                                type="password"
                            />
                            <p className="text-sm font-medium text-gray-600">Your catalog will not appear anywhere on the web. Your readers must enter the password you have set in order to read your flipbook.</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="private">
                        <div className="space-y-4 my-4">
                            <RadioGroup
                                className="flex"
                                value={selectedRadio}
                                onValueChange={handleRadioChange}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="email" id="byEmail" />
                                    <Label htmlFor="byEmail">By emails</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="readers" id="readersOnly" />
                                    <Label htmlFor="readersOnly">Readers Only</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sso" id="ssoOnly" />
                                    <Label htmlFor="ssoOnly">SSO only</Label>
                                </div>
                            </RadioGroup>
                            {selectedRadio === "email" && (
                                <>
                                    <div className="flex w-full space-x-4">
                                        <Input
                                            placeholder="Enter email addresses"
                                            className="flex-grow"
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddEmail();
                                                }
                                            }}
                                        />
                                        <Button onClick={handleAddEmail}>
                                            Add email
                                        </Button>
                                    </div>

                                    {addedEmails.length > 0 && (
                                        <div className="space-y-2">
                                            <Label>Who has access</Label>
                                            <div className="border rounded-md p-3 bg-gray-50">
                                                <ScrollArea className="max-h-24 overflow-auto">
                                                    <div className="flex flex-wrap gap-2">
                                                        {addedEmails.map((email, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant="secondary"
                                                                className="px-3 py-1 flex items-center gap-1"
                                                            >
                                                                {email}
                                                                <button
                                                                    className="ml-1 rounded-full hover:bg-gray-200 p-1"
                                                                    onClick={() => handleRemoveEmail(email)}
                                                                    aria-label={`Remove ${email}`}
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </button>
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </ScrollArea>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {selectedRadio === "readers" && (
                                filters.map((filter) => (
                                    <ReaderSelection
                                        key={filter.id}
                                        options={filter.options}
                                        selectedValues={filter.selectedValues}
                                        onChange={filter.onChange}
                                    />
                                ))
                            )
                            }
                            {selectedRadio === "sso" && (
                                <div className="p-4 border rounded-md bg-violet-50">
                                    <p>Access will be restricted to SSO users only.</p>
                                    <p className="text-gray-500 text-sm mt-2">Users must authenticate through your organization's SSO provider.</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
                <DialogFooter>
                    <Button variant="outline">
                        Cancel
                    </Button>
                    <Button>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}