import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TablePagination from "@/utils/TablePagination";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    getContactFormsApi,
    getContactSubmissionsApi
} from "@/service/contactSubmission.service";
import ContactFormDetailsDialog from "./ContactFormDetailsDialog";
import { format } from "date-fns";


export default function ContactForm({ flipbookId }) {
    const [contactForms, setContactForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState("");
    const [formsLoading, setFormsLoading] = useState(true);

    const [submissions, setSubmissions] = useState([]);
    const [submissionsLoading, setSubmissionsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    useEffect(() => {
        const getContactForms = async () => {
            try {
                setFormsLoading(true);
                const response = await getContactFormsApi(flipbookId);
                const contactForms = response.data;
                setContactForms(contactForms || []);
                if (contactForms && contactForms.length > 0) {
                    setSelectedForm(contactForms[0].value);
                }
            } catch (error) {
                toast.error("Error fetching contact forms", { description: error.message || "Oops! Something went wrong." });
            } finally {
                setFormsLoading(false);
            }
        }
        getContactForms();
    }, [flipbookId]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            if (!selectedForm) return;
            setSubmissionsLoading(true);
            try {
                const response = await getContactSubmissionsApi(selectedForm);
                const submissions = response.data.submissions;
                setSubmissions(submissions || []);
                setCurrentPage(1);
            } catch (error) {
                toast.error("Error fetching contact submissions", { description: error.message || "Oops! Something went wrong." });
            } finally {
                setSubmissionsLoading(false);
            }
        };
        fetchSubmissions();
    }, [selectedForm]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentSubmissions = submissions.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(submissions.length / recordsPerPage);

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Get all unique labels in order of first appearance
    const allLabels = [];
    submissions.forEach(sub => {
        sub.submittedFields.forEach(field => {
            if (!allLabels.includes(field.label)) {
                allLabels.push(field.label);
            }
        });
    });

    if (formsLoading) {
        return (
            <div className="w-full h-32 flex items-center justify-center">
                <Skeleton className="h-24 w-full rounded-md" />
            </div>
        );
    }

    // Zero state: no contact forms
    if (!formsLoading && contactForms.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[100px] text-center text-muted-foreground">
                <span className="text-lg font-medium">No contact forms found for this flipbook.</span>
                <span className="text-sm mt-2">Create a contact form to start collecting submissions.</span>
            </div>
        );
    }

    return (
        <div className="grid gap-2 space-y-1">
            <Label htmlFor="workspace-select">
                Form name
            </Label>
            <Select
                value={selectedForm}
                onValueChange={setSelectedForm}
                disabled={formsLoading}
            >
                <SelectTrigger className="w-[60%]">
                    <SelectValue placeholder={formsLoading ? "Loading..." : "Select a form"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {formsLoading
                            ? Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="px-2 py-1.5"><Skeleton className="h-4 w-32" /></div>
                            ))
                            : contactForms.map((form) => (
                                <SelectItem key={form.value} value={form.value}>{form.label}</SelectItem>
                            ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            {allLabels.map(label => (
                                <TableHead key={label}>{label}</TableHead>
                            ))}
                            <TableHead>GDPR</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {submissionsLoading
                            ? Array.from({ length: 2 }).map((_, i) => (
                                <TableRow key={i}>
                                    {Array.from({ length: allLabels.length + 3 }).map((_, j) => (
                                        <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                                    ))}
                                </TableRow>
                            ))
                            : currentSubmissions.length > 0
                                ? currentSubmissions.map((submission) => (
                                    <TableRow key={submission._id}>
                                        <TableCell>{submission.submittedAt ? format(new Date(submission.submittedAt), "yyyy/MM/dd, hh:mm a") : "-"}</TableCell>
                                        {allLabels.map(label => {
                                            const field = submission.submittedFields.find(f => f.label === label);
                                            return <TableCell key={label}>{field ? field.value : "-"}</TableCell>;
                                        })}
                                        <TableCell>
                                            <span className={submission.gdprAccepted
                                                ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                                : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"}>
                                                {submission.gdprAccepted ? "Yes" : "No"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <ContactFormDetailsDialog submissionId={submission._id} />
                                        </TableCell>
                                    </TableRow>
                                ))
                                : (
                                    <TableRow>
                                        <TableCell colSpan={allLabels.length + 3} className="text-center text-muted-foreground">No submissions found.</TableCell>
                                    </TableRow>
                                )
                        }
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChangePage={changePage}
            />
            <div className="text-sm text-gray-500 mt-2 text-center">
                {submissionsLoading
                    ? <Skeleton className="h-4 w-40 mx-auto" />
                    : submissions.length > 0
                    && `Showing ${indexOfFirstRecord + 1}-${Math.min(indexOfLastRecord, submissions.length)} of ${submissions.length} submissions`
                }
            </div>
        </div>
    )
}