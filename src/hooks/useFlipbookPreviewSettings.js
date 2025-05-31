import { useState, useEffect } from 'react';
import { GetFlipbookPreviewSettingApi } from '@/service/flipbookPreviewSetting.service';
import { flipbookPreviewFieldKey } from '@/utils/enum';
import { toast } from 'sonner';

let globalEnabledFields = [];

export const useFlipbookPreviewSettings = () => {
    const [enabledFields, setEnabledFields] = useState(globalEnabledFields);

    useEffect(() => {
        const fetchSettings = async () => {
            if (globalEnabledFields.length === 0) {
                try {
                    const response = await GetFlipbookPreviewSettingApi();
                    globalEnabledFields = response.data;
                    setEnabledFields(globalEnabledFields);
                } catch (error) {
                    toast.error('Failed to fetch flipbook preview settings',{
                        description: error.message
                    });
                }
            }
        };

        fetchSettings();
    }, []);

    const isFieldEnabled = (fieldKey) => {
        return enabledFields.includes(flipbookPreviewFieldKey[fieldKey]);
    };

    return {
        enabledFields,
        isFieldEnabled,
    };
}; 