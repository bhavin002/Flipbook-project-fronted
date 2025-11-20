import { createContext, useContext, useState } from "react";

export const ViewModeContext = createContext();

export function ViewModeProvider({ children }) {
    const [activeTab, setActiveTab] = useState("Desktop");

    return (
        <ViewModeContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </ViewModeContext.Provider>
    );
}

export function useViewMode() {
    const context = useContext(ViewModeContext);
    if (!context) {
        throw new Error('useViewMode must be used within a ViewModeProvider');
    }
    return context;
} 