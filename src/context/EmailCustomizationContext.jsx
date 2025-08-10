import { createContext, useContext, useState, useEffect } from 'react';

const EmailCustomizationContext = createContext();

export const useEmailCustomization = () => {
    const context = useContext(EmailCustomizationContext);
    if (!context) {
        throw new Error('useEmailCustomization must be used within an EmailCustomizationProvider');
    }
    return context;
};

export const EmailCustomizationProvider = ({ children }) => {
    const [emailData, setEmailData] = useState({
        subject: "hopoleh620 hopoleh620 shared a flipbook with you!",
        title: "This is my masterpiece",
        description: "Take a look at this publication to see my recent work. I made this flipbook using Flipnova.",
        label: "READ BOOK",
        footerDescription: "Flipnova LLC - 535 Mission St. FL 14, San Francisco, CA 94105, USA",
        backgroundColor: "#e6e7e8",
        accentColor: "#7b39ed",
        logo: "https://flipbook-subway-workspace-logo.s3.ap-south-1.amazonaws.com/5e909bd2-5ac1-4dd8-a886-2df3327e86cb.png"
    });

    const updateEmailData = (field, value) => {
        setEmailData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const updateLogo = (logoUrl) => {
        setEmailData(prev => ({
            ...prev,
            logo: logoUrl
        }));
    };

    const resetLogo = () => {
        setEmailData(prev => ({
            ...prev,
            logo: "https://flipbook-subway-workspace-logo.s3.ap-south-1.amazonaws.com/5e909bd2-5ac1-4dd8-a886-2df3327e86cb.png"
        }));
    };

    const value = {
        emailData,
        updateEmailData,
        updateLogo,
        resetLogo
    };

    return (
        <EmailCustomizationContext.Provider value={value}>
            {children}
        </EmailCustomizationContext.Provider>
    );
}; 