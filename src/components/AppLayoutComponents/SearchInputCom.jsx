import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { useFlipbook } from '@/context/FlipbookContext';
import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'; 

export default function SearchInputCom({ searchValue, setSearchValue }) {
    const { fetchFlipbooks } = useFlipbook();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const getFolderIdFromRoute = () => {
        const path = location.pathname; 
        const folderMatch = path.match(/\/myflipbooks\/flipbooks\/folder\/([^\/]+)/);
        return folderMatch ? folderMatch[1] : null;
    };

    useEffect(() => {
        const searchFromUrl = searchParams.get('search') || '';
        if (searchFromUrl !== searchValue) {
            setSearchValue(searchFromUrl);
            
            if (searchFromUrl.trim()) {
                performSearch(searchFromUrl);
            } else {
                performSearch('');
            }
        }
    }, [searchParams]);

    const performSearch = (searchText) => {
        const folderId = getFolderIdFromRoute();
        
        if (searchText.trim()) {
            const payload = { searchText: searchText };
            if (folderId) {
                payload.folderId = folderId;
            }
            fetchFlipbooks(payload);
        } else {
            const payload = {};
            if (folderId) {
                payload.folderId = folderId;
            }
            fetchFlipbooks(payload);
        }
    };

    const updateUrlParams = (searchText) => {
        const currentParams = new URLSearchParams(searchParams);
        
        if (searchText.trim()) {
            currentParams.set('search', searchText);
        } else {
            currentParams.delete('search');
        }
        
        const newUrl = `${location.pathname}${currentParams.toString() ? '?' + currentParams.toString() : ''}`;
        navigate(newUrl, { replace: true });
    };

    const handleSearchChange = (e) => {
        if (e.target.value.trim() === '') {
            updateUrlParams('');
            performSearch('');
        }
        setSearchValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateUrlParams(searchValue);
            performSearch(searchValue);
        }
    };

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
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    );
}