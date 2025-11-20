import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function GetShareLink({ isShareModalOpen, setIsShareModalOpen, folderId }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    const shareUrl = `${import.meta.env.VITE_APP_URL}/myflipbooks/flipbooks/folder/${folderId}`;
    navigator.clipboard.writeText(shareUrl)
        .then(() => {
            setCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
            toast.error("Failed to copy link");
        });
  }

  return (
    <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
      <DialogContent className="sm:max-w-[540px] w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Share Folder</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Share Link</p>
            <p className="text-sm text-gray-600 mb-4">
              Anyone with this link can view the folder.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Input 
              value={`${import.meta.env.VITE_APP_URL}/myflipbooks/flipbooks/folder/${folderId}`}
              readOnly 
              className="flex-1"
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
        </div>
      </DialogContent>
    </Dialog>
  )
}