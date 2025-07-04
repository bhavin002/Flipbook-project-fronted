import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GetFlipbookPreviewSettingByIdApi, UpdateFlipbookPreviewSettingApi } from '@/service/flipbookPreviewSetting.service';
import { toast } from 'sonner';

export const FlipbookSettingsContext = createContext();

export const FlipbookSettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);
    const [updateCounter, setUpdateCounter] = useState(0);
    const [latestSettings, setLatestSettings] = useState(null);
    const [latestJson, setLatestJson] = useState(null)
    const { id: flipbookId } = useParams();

    console.log("updateCounter :", updateCounter);

    const fetchSettings = useCallback(async () => {
        if (!flipbookId || hasFetched) return;
        try {
            const response = await GetFlipbookPreviewSettingByIdApi(flipbookId);
            setLatestSettings(response.data);
            setSettings(response.data);
            setLatestJson({
                ...response.data,
                brandLogoId: response.data.brandLogoLink
            })
            setHasFetched(true);
        } catch (error) {
            toast.error('Failed to fetch flipbook settings', {
                description: error.message,
            });
        }
    }, [flipbookId, hasFetched]);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    const updateSettings = async (payload) => {
        try {
            setUpdateCounter(prev => prev + 1);
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                if (key === 'tableOfContents') {
                    formData.append(key, JSON.stringify(value));
                } else if (key === "leadForm") {
                    const leadFormData = {
                        ...value,
                        fields: value.fields.map((field) => ({
                            ...field,
                            _id: undefined,
                        })),
                    };
                    formData.append(key, JSON.stringify(leadFormData));
                } else {
                    formData.append(key, value);
                }
            });

            const formDataObj = {};
            for (let [key, value] of formData.entries()) {
                try {
                    formDataObj[key] = JSON.parse(value);
                } catch (e) {
                    formDataObj[key] = value;
                }
            }

            console.log("formDataObj ???", formDataObj);

            setLatestJson(prevLatestJson => ({
                ...prevLatestJson,
                ...formDataObj
            }));

            if (formData.get('brandLogoId')) {
                formData.delete('brandLogoLink');
            }

            if (formData.get("backgroundImage")) {
                formData.delete('backgroundImageURL');
            }

            if (formData.get("backgroundAudioFile")) {
                formData.delete('backgroundAudioLink');
            }

            const response = await UpdateFlipbookPreviewSettingApi(flipbookId, formData);

            setUpdateCounter(prev => {
                const newCounter = prev - 1;
                if (newCounter === 0) {
                    setLatestSettings(response.data);
                }
                return newCounter;
            });
        } catch (error) {
            setUpdateCounter(prev => prev - 1);
            toast.error("Failed to update settings", { description: error.message });
            throw error;
        }
    };

    return (
        <FlipbookSettingsContext.Provider value={{ settings, updateSettings, flipbookId, latestSettings, latestJson }}>
            {children}
        </FlipbookSettingsContext.Provider>
    );
};

export const useFlipbookSettings = () => {
    const context = useContext(FlipbookSettingsContext);
    if (!context) {
        throw new Error('useFlipbookSettings must be used within a FlipbookSettingsProvider');
    }
    return context;
};