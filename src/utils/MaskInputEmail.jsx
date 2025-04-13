import React, { useState, useEffect } from 'react';
import { X } from "lucide-react";

export default function MaskInputEmail({
  onChange,
  maxKeywords = Infinity,
  initialKeywords = [],
  className = '',
  placeholder = "Type and press Enter",
  value: propValue,
}) {
  const [keywords, setKeywords] = useState(propValue || initialKeywords);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (propValue !== undefined) {
      setKeywords(propValue);
    }
  }, [propValue]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (keywords.length >= maxKeywords) {
        return;
      }
      const newKeywords = [...keywords, inputValue.trim()];
      setKeywords(newKeywords);
      setInputValue('');
      onChange?.(newKeywords);
    } else if (e.key === 'Backspace' && !inputValue && keywords.length > 0) {
      const newKeywords = keywords.slice(0, -1);
      setKeywords(newKeywords);
      onChange?.(newKeywords);
    }
  };

  const removeKeyword = (indexToRemove) => {
    const newKeywords = keywords.filter((_, index) => index !== indexToRemove);
    setKeywords(newKeywords);
    onChange?.(newKeywords);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`flex flex-wrap items-start gap-2 p-2 min-h-20 rounded-md border ${isFocused ? 'border-primary' : 'border-input'} bg-transparent`}>
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 text-black bg-[#FAFBFB] text-sm px-2 py-1 rounded-md"
          >
            {keyword}
            <button
              type="button"
              onClick={() => removeKeyword(index)}
              className="hover:text-primary focus:outline-none"
              aria-label={`Remove ${keyword}`}
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={keywords.length === 0 ? placeholder : ""}
          className={`flex-1 bg-transparent outline-none text-sm min-w-[120px] placeholder:text-muted-foreground`}
          aria-label="Add keyword"
        />
      </div>
    </div>
  );
}