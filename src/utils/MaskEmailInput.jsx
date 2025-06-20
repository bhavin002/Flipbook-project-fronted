import React, { useState, useEffect } from 'react';
import { X } from "lucide-react";

export default function MaskEmailInput({
  onChange,
  maxEmails = Infinity,
  initialEmails = [],
  className = '',
  placeholder = "Enter email and press Enter",
  value: propValue,
  error = false,
}) {
  const [emails, setEmails] = useState(propValue || initialEmails);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (propValue !== undefined) {
      setEmails(propValue);
    }
  }, [propValue]);

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      
      // Check if email is valid
      if (!isValidEmail(trimmedValue)) {
        setIsInvalid(true);
        // Reset invalid state after 2 seconds
        setTimeout(() => setIsInvalid(false), 2000);
        return;
      }

      // Check if we've reached the maximum number of emails
      if (emails.length >= maxEmails) {
        return;
      }

      // Check for duplicate
      if (emails.includes(trimmedValue)) {
        setIsInvalid(true);
        setTimeout(() => setIsInvalid(false), 2000);
        return;
      }

      const newEmails = [...emails, trimmedValue];
      setEmails(newEmails);
      setInputValue('');
      setIsInvalid(false);
      onChange?.(newEmails);
    } else if (e.key === 'Backspace' && !inputValue && emails.length > 0) {
      const newEmails = emails.slice(0, -1);
      setEmails(newEmails);
      onChange?.(newEmails);
    }
  };

  const removeEmail = (indexToRemove) => {
    const newEmails = emails.filter((_, index) => index !== indexToRemove);
    setEmails(newEmails);
    onChange?.(newEmails);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Reset invalid state when user starts typing
    if (isInvalid) {
      setIsInvalid(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`flex flex-wrap items-start gap-2 p-2 rounded-md border ${
        error || isInvalid 
          ? 'border-red-500' 
          : isFocused 
            ? 'border-primary' 
            : 'border-gray-300'
      } bg-transparent transition-colors`}>
        {emails.map((email, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-1 text-black bg-[#efefef] text-sm px-2 py-1 rounded-md"
          >
            <div className="max-w-32 truncate font-semibold" title={email}>
              {email}
            </div>
            <button
              type="button"
              onClick={() => removeEmail(index)}
              className="focus:outline-none transition-colors"
              aria-label={`Remove ${email}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <input
          type="email"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={emails.length === 0 ? placeholder : ""}
          className={`flex-1 bg-transparent outline-none w-full text-sm placeholder:text-gray-400 min-w-20 px-2 py-1 ${
            error || isInvalid ? 'text-red-500' : ''
          }`}
          aria-label="Add email"
        />
      </div>
    </div>
  );
}