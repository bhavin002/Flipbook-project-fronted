import { emailSchema } from '@/schemas/email.schema';
import { createContext, useContext, useState } from 'react';

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
        emails: [],
        subject: "hopoleh620 hopoleh620 shared a flipbook with you!",
        title: "This is my masterpiece",
        description: "Take a look at this publication to see my recent work. I made this flipbook using Flipnova.",
        label: "READ BOOK",
        footerDescription: "Flipnova LLC - 535 Mission St. FL 14, San Francisco, CA 94105, USA",
        backgroundColor: "#e6e7e8",
        accentColor: "#7b39ed",
        logo: "https://flipbook-subway-workspace-logo.s3.ap-south-1.amazonaws.com/5e909bd2-5ac1-4dd8-a886-2df3327e86cb.png",
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateEmailData = () => {
        try {
            emailSchema.parse(emailData);
            clearErrors();
            return true;
        } catch (error) {
            const validationErrors = {};
            
            error.errors.forEach((err) => {
                const path = err.path[0];
                validationErrors[path] = err.message;
            });
            
            setErrors(validationErrors);
            return false;
        }
    };

    const updateEmailData = (field, value) => {
        setEmailData(prev => ({
            ...prev,
            [field]: value
        }));
        
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    const updateEmails = (emails) => {
        setEmailData(prev => ({
            ...prev,
            emails
        }));
        
        if (errors.emails) {
            setErrors(prev => ({
                ...prev,
                emails: null
            }));
        }
    };

    const updateLogo = (logoUrl) => {
        setEmailData(prev => ({
            ...prev,
            logo: logoUrl
        }));

        if (errors.logo) {
            setErrors(prev => ({
                ...prev,
                logo: null
            }));
        }
    };

    const resetLogo = () => {
        setEmailData(prev => ({
            ...prev,
            logo: "https://flipbook-subway-workspace-logo.s3.ap-south-1.amazonaws.com/5e909bd2-5ac1-4dd8-a886-2df3327e86cb.png"
        }));

        if (errors.logo) {
            setErrors(prev => ({
                ...prev,
                logo: null
            }));
        }
    };

    const setFieldError = (field, error) => {
        setErrors(prev => ({
            ...prev,
            [field]: error
        }));
    };

    const clearErrors = () => {
        setErrors({});
    };

    const value = {
        emailData,
        updateEmailData,
        updateEmails,
        updateLogo,
        resetLogo,
        errors,
        setFieldError,
        clearErrors,
        isLoading,
        setIsLoading,
        validateEmailData
    };

    return (
        <EmailCustomizationContext.Provider value={value}>
            {children}
        </EmailCustomizationContext.Provider>
    );
};