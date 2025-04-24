
import { Label } from "@/components/ui/label";
import ContactFormDialog from "./ContactForm/ContactFormDialog";

export default function ContactForm() {
    return (
        <div className="p-6 space-y-2 w-full">
            <Label className="text-lg">Contact Form</Label>
            <p className="text-sm">Gather information and enhance communication. Perfect for feedback and inquiries.</p>
            <ContactFormDialog/>
        </div>
    )
}