import BookShelfView from "@/components/ShelfLayoutComponents/BookShelfView"
import { BookshelfProvider } from "@/context/BookshelfContext"
import { useParams } from "react-router-dom"

export default function PublicBookShelf() {
    const { id } = useParams()

    return (
        <BookshelfProvider flipbookId={id}>
            <div className="h-[100vh]">
                <BookShelfView id={id} isPublicView={true} />
            </div>
        </BookshelfProvider>

    )
}