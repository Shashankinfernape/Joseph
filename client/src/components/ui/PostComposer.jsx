import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Image, Paperclip, Smile } from 'lucide-react';
import { cn } from '../../lib/utils';

export function PostComposer({ onSubmit }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);
  const maxLength = 500;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Post cannot be empty.");
      return;
    }
    if (content.length > maxLength) {
      setError("Post is too long.");
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      onSubmit({ content });
      setContent('');
      setIsSubmitting(false);
      setIsExpanded(false);
    }, 500);
  };

  const handleFocus = () => setIsExpanded(true);

  return (
    <Card className="overflow-hidden">
      <div className="p-4 flex gap-3">
        {/* Avatar Placeholder */}
        <div className="w-10 h-10 rounded-full bg-[#EDEFF1] dark:bg-[#343536] flex-shrink-0 flex items-center justify-center font-bold text-sm text-[#787C7E]" aria-hidden="true">
          U
        </div>
        
        <form onSubmit={handleSubmit} className="flex-grow">
          <textarea
            placeholder="What's happening in the school?"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (error) setError(null);
            }}
            onFocus={handleFocus}
            className={cn(
              "w-full bg-transparent resize-none outline-none text-[#1C1C1C] dark:text-[#D7DADC] text-base sm:text-lg placeholder:text-[#787C7E] transition-all",
              isExpanded ? "min-h-[100px]" : "h-10"
            )}
            maxLength={maxLength}
            aria-label="Post composer input"
            aria-invalid={!!error}
          />
          
          {error && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {error}
            </p>
          )}
          
          {isExpanded && (
            <div className="flex items-center justify-between pt-2 border-t border-[#EDEFF1] dark:border-[#343536] mt-2">
              <div className="flex items-center gap-1 text-[#0079D3]" role="toolbar" aria-label="Post formatting">
                <button type="button" className="p-2 hover:bg-[#E8F5FD] dark:hover:bg-[#0079D3]/20 rounded-full transition-colors" aria-label="Add image">
                  <Image className="w-5 h-5" aria-hidden="true" />
                </button>
                <button type="button" className="p-2 hover:bg-[#E8F5FD] dark:hover:bg-[#0079D3]/20 rounded-full transition-colors" aria-label="Add attachment">
                  <Paperclip className="w-5 h-5" aria-hidden="true" />
                </button>
                <button type="button" className="p-2 hover:bg-[#E8F5FD] dark:hover:bg-[#0079D3]/20 rounded-full transition-colors" aria-label="Add emoji">
                  <Smile className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={cn(
                  "text-xs font-medium",
                  content.length > maxLength - 20 ? "text-red-500" : "text-[#787C7E]"
                )} aria-live="polite">
                  {content.length}/{maxLength}
                </span>
                <Button 
                  type="submit" 
                  disabled={!content.trim() || isSubmitting || content.length > maxLength}
                  className="rounded-full px-5 py-2 font-bold"
                  aria-label="Send post"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-label="Submitting"></div>
                  ) : (
                    "Post"
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </Card>
  );
}
