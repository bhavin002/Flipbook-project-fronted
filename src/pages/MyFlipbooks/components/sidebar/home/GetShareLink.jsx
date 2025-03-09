import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
  import { Globe, Lock, Copy, Check } from 'lucide-react'
  import { useState } from 'react'
  
  export default function GetShareLink({ isShareModalOpen, setIsShareModalOpen }) {
    const [copied, setCopied] = useState(false)
    
    const handleCopy = () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  
    return (
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-[540px] w-[90vw]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Share Folder</DialogTitle>
          </DialogHeader>
          <div>
          <p className="text-sm font-medium mb-1">Visibility</p>
          <Tabs defaultValue="public">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="public">
                <Globe className="w-4 h-4 mr-2" /> Public
              </TabsTrigger>
              <TabsTrigger value="private">
                <Lock className="w-4 h-4 mr-2" /> Private
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="public">
              <Card>
                <CardHeader>
                  <CardTitle>Public Link</CardTitle>
                  <CardDescription>
                    Anyone with the link can view the folder freely.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input 
                      value="https://www.flipsnack.com/65BDD977C6F/d/a5a5f848-2a20-45ee-b4aa-4d21fa7fff08/" 
                      readOnly 
                    />
                    <Button variant="outline" onClick={handleCopy}>
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="private">
              <Card>
                <CardHeader>
                  <CardTitle>Private Link</CardTitle>
                  <CardDescription>
                    Only specific users you invite can access this folder.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input 
                      value="https://www.flipsnack.com/65BDD977C6F/d/a5a5f848-2a20-45ee-b4aa-4d21fa7fff08/" 
                      readOnly 
                    />
                    <Button variant="outline" onClick={handleCopy}>
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    )
  }