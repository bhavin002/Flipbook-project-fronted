import { createContext, useContext, useState, useEffect } from 'react';
import { getShopSettingApi, updateShopSettingApi } from '@/service/shopSettings.service';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { useCurrency } from './CurrencyContext';

const ShopSettingsContext = createContext();

export function ShopSettingsProvider({ children, publicData }) {
    const { id: flipbookId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [shopSettings, setShopSettings] = useState(null);
    const { currencies } = useCurrency();

    const getCurrentCurrency = () => {
        if (!shopSettings) return null;
        const currentCurrency = currencies.find(currency => currency.value === shopSettings.currencyId);
        return currentCurrency ? currentCurrency.code : null;
    }

    const fetchShopSettings = async () => {
        if (!flipbookId) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await getShopSettingApi(flipbookId);
            setShopSettings(response.data.flipbookShopSettings);
        } catch (error) {
            toast.error("Shop settings fetch failed", {
                description: error.message || "Oops! Something went wrong.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const updateShopSettings = async (data) => {
        if (!flipbookId) {
            toast.error("No flipbook ID provided");
            return;
        }

        try {
            setIsLoading(true);
            const response = await updateShopSettingApi(flipbookId, data);
            setShopSettings(response.data.flipbookShopSettings);
            toast.success("Shop settings updated successfully");
            return response;
        } catch (error) {
            toast.error("Shop settings update failed", {
                description: error.message || "Oops! Something went wrong.",
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (publicData) {
            setShopSettings(publicData.shopSettings);
            setIsLoading(false);
        } else {
            fetchShopSettings();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [publicData, flipbookId]);

    const value = {
        shopSettings,
        setShopSettings,
        isLoading,
        fetchShopSettings,
        updateShopSettings,
        flipbookId,
        getCurrentCurrency
    };

    return (
        <ShopSettingsContext.Provider value={value}>
            {children}
        </ShopSettingsContext.Provider>
    );
}

export function useShopSettings() {
    const context = useContext(ShopSettingsContext);
    if (!context) {
        throw new Error('useShopSettings must be used within a ShopSettingsProvider');
    }
    return context;
}