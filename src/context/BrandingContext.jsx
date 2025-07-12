import React, { createContext, useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { brandingSchema } from '@/schemas/branding.schema';
import { getWorkspaceProfileApi } from '@/service/workspace.service';
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
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [previewUrls, setPreviewUrls] = useState({
    favicon: null,
    logo: null,
    profileImage: null,
    socialMediaImage: null,
  });
  
  // Track original image values to determine what to include in payload
  const [originalImages, setOriginalImages] = useState({
    favicon: null,
    logo: null,
    profileImage: null,
    socialMediaImage: null,
  });
  
  // Track image changes for payload generation
  const [imageChanges, setImageChanges] = useState({
    favicon: null, // null = unchanged, file = uploaded, 'deleted' = deleted
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
        setIsLoading(true);
        const response = await getWorkspaceProfileApi();
        form.reset({
          ...response.data,
          footerLinks: response.data.footerLinks.map(link => ({
            title: link.title,
            url: link.url || '',
          })),
        });
        
        // Set original images for comparison
        setOriginalImages({
          favicon: response.data.favicon,
          logo: response.data.logo,
          profileImage: response.data.profileImage,
          socialMediaImage: response.data.socialMediaImage,
        });
        
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

  const handleInputChange = (field, value) => {
    // Handle URL fields (social media links)
    if (['facebook', 'twitter', 'youtube', 'instagram', 'linkedin', 'websiteLink'].includes(field)) {
      // If empty, just set empty value
      if (!value) {
        form.setValue(field, '', { shouldDirty: true });
        setHasChanges(true);
        return;
      }

      // Remove any existing http:// or https://
      let cleanUrl = value.replace(/^https?:\/\//, '');
      
      // Add https:// if not present
      if (cleanUrl && !cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        cleanUrl = `https://${cleanUrl}`;
      }

      form.setValue(field, cleanUrl, { shouldDirty: true });
    } else {
      form.setValue(field, value, { shouldDirty: true });
    }
    setHasChanges(true);
  };

  const handleFileUpload = async (field, file) => {
    try {
      const base64 = await getBase64(file);
      setPreviewUrls(prev => ({
        ...prev,
        [field]: base64
      }));
      form.setValue(field, file, { shouldDirty: true });
      
      // Mark as uploaded for payload generation
      setImageChanges(prev => ({
        ...prev,
        [field]: file
      }));
      
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
    
    // Mark as deleted for payload generation
    setImageChanges(prev => ({
      ...prev,
      [field]: 'deleted'
    }));
    
    setHasChanges(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to get payload with proper image handling
  const getPayload = () => {
    const formData = form.getValues();
    const payload = { ...formData };
    
    // Handle image fields based on changes
    const imageFields = ['favicon', 'logo', 'profileImage', 'socialMediaImage'];
    
    imageFields.forEach(field => {
      const change = imageChanges[field];
      
      if (change === 'deleted') {
        // Include null for deleted images
        payload[field] = null;
      } else if (change instanceof File) {
        // Include file for uploaded images
        payload[field] = change;
      } else {
        // Remove field from payload if unchanged
        delete payload[field];
      }
    });
    
    return payload;
  };

  return (
    <BrandingContext.Provider
      value={{
        form,
        isLoading,
        hasChanges,
        setHasChanges,
        previewUrls,
        imageChanges,
        getPayload,
        handleInputChange,
        handleFileUpload,
        handleDeleteFile,
      }}
    >
      {children}
    </BrandingContext.Provider>
  );
}; 