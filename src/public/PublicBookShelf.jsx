import BookShelfView from "@/components/ShelfLayoutComponents/BookShelfView"
import { useParams } from "react-router-dom"

export default function PublicBookShelf() {
    const { id } = useParams()

    return (
        <div className="h-[100vh]">
            <BookShelfView id={id} />
        </div>
    )
}