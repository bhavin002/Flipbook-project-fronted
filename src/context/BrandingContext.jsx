import React, { createContext, useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { brandingSchema } from '@/schemas/branding.schema';
import { getWorkspaceProfileApi, UpdateWorkspaceApi } from '@/service/workspace.service';
import { toast } from 'sonner';

const BrandingContext = createContext();

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
};

export const BrandingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [previewUrls, setPreviewUrls] = useState({
    favicon: null,
    logo: null,
    profileImage: null,
    socialMediaImage: null,
  });

  const form = useForm({
    resolver: zodResolver(brandingSchema),
    defaultValues: {
      name: '',
      logo: null,
      description: '',
      isProfileInfoHidden: false,
      websiteLink: '',
      facebook: '',
      twitter: '',
      youtube: '',
      instagram: '',
      linkedin: '',
      footerLinks: [{ title: '', url: '' }],
      headerColor: '#ffffff',
      elementColor: '#7B39ED',
      isHeaderVisible: true,
      isSearchBarVisible: true,
      isProfilePrivate: false,
      profileImage: null,
      socialMediaImage: null,
      favicon: null,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWorkspaceProfileApi();
        console.log("response >?",response)
        form.reset({
          ...response.data,
          footerLinks: response.data.footerLinks.map(link => ({
            title: link.title,
            url: link.url || '',
          })),
        });
        // Set preview URLs from API response
        setPreviewUrls({
          favicon: response.data.favicon,
          logo: response.data.logo,
          profileImage: response.data.profileImage,
          socialMediaImage: response.data.socialMediaImage,
        });
      } catch (error) {
        toast.error("Failed to fetch workspace profile", {
          description: error.message || "Oops! Something went wrong.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      
      // Append all form fields to FormData
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          if (key === 'footerLinks') {
            formData.append(key, JSON.stringify(data[key]));
          } else {
            formData.append(key, data[key]);
          }
        }
      });

      await UpdateWorkspaceApi(formData);
      setHasChanges(false);
    } catch (error) {
      console.error('Error updating workspace profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (field, file) => {
    try {
      const base64 = await getBase64(file);
      setPreviewUrls(prev => ({
        ...prev,
        [field]: base64
      }));
      form.setValue(field, file, { shouldDirty: true });
      setHasChanges(true);
    } catch (error) {
      console.error('Error converting file to base64:', error);
    }
  };

  const handleDeleteFile = (field) => {
    setPreviewUrls(prev => ({
      ...prev,
      [field]: null
    }));
    form.setValue(field, null, { shouldDirty: true });
    setHasChanges(true);
  };

  const handleInputChange = (field, value) => {
    form.setValue(field, value, { shouldDirty: true });
    setHasChanges(true);
  };

  return (
    <BrandingContext.Provider
      value={{
        form,
        isLoading,
        hasChanges,
        previewUrls,
        handleSubmit: form.handleSubmit(handleSubmit),
        handleFileUpload,
        handleDeleteFile,
        handleInputChange,
      }}
    >
      {children}
    </BrandingContext.Provider>
  );
}; 