import React from 'react';
import { Home, Search, User, Settings } from 'lucide-react';

export default function BottomSidebarNavigation() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 w-full items-center justify-around bg-primary md:h-16">
            <a
                href="#"
                className="flex flex-col items-center justify-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary"
                prefetch={false}
            >
                <Home className="h-6 w-6" />
                Home
            </a>
            <a
                href="#"
                className="flex flex-col items-center justify-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary"
                prefetch={false}
            >
                <Search className="h-6 w-6" />
                Search
            </a>
            <a
                href="#"
                className="flex flex-col items-center justify-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary"
                prefetch={false}
            >
                <User className="h-6 w-6" />
                Profile
            </a>
            <a
                href="#"
                className="flex flex-col items-center justify-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary focus:text-primary"
                prefetch={false}
            >
                <Settings className="h-6 w-6" />
                Settings
            </a>
        </nav>
    );
};