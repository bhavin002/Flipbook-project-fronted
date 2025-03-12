import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react';
import RecentSearchTabCom from "./RecentSearchTabCom";

export default function SearchInputCom({ searchValue, setSearchValue, isFocused, setIsFocused }) {

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    return (
        <>
            <div className="grid w-full items-center gap-1.5">
                <div className="relative">
                    <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                        <Search className="h-4 w-4" />
                    </div>
                    <Input
                        id="search"
                        autoComplete="off"
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8"
                        value={searchValue}
                        onChange={handleSearchChange}
                        onFocus={handleFocus}
                    />
                </div>
            </div>
            {searchValue && (
                <div className="absolute mt-1 top-10 left-0 z-20">
                    <RecentSearchTabCom />
                </div>
            )}
        </>
    )
}