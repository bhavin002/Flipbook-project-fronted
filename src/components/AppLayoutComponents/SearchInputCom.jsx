import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { useFlipbook } from '@/context/FlipbookContext';
import { useEffect, useState } from 'react';

export default function SearchInputCom({ searchValue, setSearchValue, isFocused, setIsFocused }) {
    const { fetchFlipbooks } = useFlipbook();
    const [debouncedValue, setDebouncedValue] = useState(searchValue);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        setDebouncedValue(e.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    useEffect(() => {
        if (!isFocused) return;

        const handler = setTimeout(() => {
            if (debouncedValue.trim()) {
                fetchFlipbooks({ searchText: debouncedValue });
            } else if (searchValue === '') {
                fetchFlipbooks();
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [searchValue]);

    return (
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
    );
}