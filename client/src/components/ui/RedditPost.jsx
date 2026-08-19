import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, ShieldCheck, Pin } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Card } from './Card';

export function RedditPost({ 
  id,
  title, 
  author, 
  timeAgo, 
  flair, 
  flairType = "default",
  content, 
  image, 
  initialUpvotes = 0,
  commentCount = 0,
  isPinned = false 
}) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [vote, setVote] = useState(0); // 1 for upvote, -1 for downvote, 0 for none

  const handleVote = (delta) => {
    if (vote === delta) {
      setVote(0);
      setUpvotes(prev => prev - delta);
    } else {
      const prevDelta = vote;
      setVote(delta);
      setUpvotes(prev => prev - prevDelta + delta);
    }
  };

  const flairStyles = {
    default: "bg-[#EDEFF1] dark:bg-[#272729] text-[#1C1C1C] dark:text-[#D7DADC]",
    skyblue: "bg-[#E8F5FD] dark:bg-[#0079D3]/20 text-[#0079D3] border border-[#BCE0FD] dark:border-[#0079D3]/40",
    green: "bg-[#E6F4EA] text-[#46D160] border border-[#CEEAD6]",
    amber: "bg-[#FFF2D6] text-[#B06000]"
  };

  return (
    <Card className="overflow-hidden">
      {/* Post Content */}
      <div className="p-3 sm:p-4 space-y-2">
        {/* Meta header */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#787C7E] flex-wrap">
          {isPinned && (
            <>
              <span className="flex items-center gap-1 font-bold text-[#46D160]">
                <Pin className="w-3.5 h-3.5 fill-[#46D160]" />
                <span>PINNED BY MODS</span>
              </span>
              <span>•</span>
            </>
          )}
          <span>Posted by <strong className="text-[#1C1C1C] dark:text-[#D7DADC] hover:underline cursor-pointer">u/{author}</strong></span>
          <span>{timeAgo}</span>
          {flair && (
            <span className={cn("px-2 py-0.5 rounded-full font-bold text-[10px]", flairStyles[flairType])}>
              {flair}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-base sm:text-lg font-extrabold text-[#1C1C1C] dark:text-white leading-snug">
          {title}
        </h2>

        {/* Text Content */}
        {content && (
          <div className="text-xs sm:text-sm text-[#3C4043] dark:text-[#B0B3B8] leading-relaxed">
            {content}
          </div>
        )}

        {/* Image Content */}
        {image && (
          <div className="mt-2 rounded-xl overflow-hidden border border-[#EDEFF1] dark:border-[#2D3236]">
            {image}
          </div>
        )}

        {/* Modern Reddit Action Strip */}
        <div className="pt-3 flex items-center flex-wrap gap-2 text-xs font-bold text-[#576f76] dark:text-[#878A8C]">
          {/* Upvote Pill */}
          <div className="flex items-center bg-[#EAEDEF] dark:bg-[#272729] rounded-full">
            <button
              onClick={() => handleVote(1)}
              className={cn("p-1.5 sm:p-2 rounded-full transition-colors hover:bg-[#D2D6D9] dark:hover:bg-[#343536]", vote === 1 ? "text-[#D93A00]" : "")}
              aria-label="Upvote"
            >
              <ArrowBigUp className={cn("w-5 h-5", vote === 1 && "fill-[#D93A00]")} />
            </button>
            <span className={cn("px-1 min-w-[20px] text-center", vote === 1 ? "text-[#D93A00]" : vote === -1 ? "text-[#6A5CFF]" : "")}>
              {upvotes}
            </span>
            <button
              onClick={() => handleVote(-1)}
              className={cn("p-1.5 sm:p-2 rounded-full transition-colors hover:bg-[#D2D6D9] dark:hover:bg-[#343536]", vote === -1 ? "text-[#6A5CFF]" : "")}
              aria-label="Downvote"
            >
              <ArrowBigDown className={cn("w-5 h-5", vote === -1 && "fill-[#6A5CFF]")} />
            </button>
          </div>

          <Link to={`/post/${id}`} className="bg-[#EAEDEF] dark:bg-[#272729] hover:bg-[#D2D6D9] dark:hover:bg-[#343536] px-3 py-2 rounded-full flex items-center gap-1.5 transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span>{commentCount}</span>
          </Link>
          
          <button className="bg-[#EAEDEF] dark:bg-[#272729] hover:bg-[#D2D6D9] dark:hover:bg-[#343536] px-3 py-2 rounded-full flex items-center gap-1.5 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          
          <Link to="/mandatory-disclosure" className="bg-[#EAEDEF] dark:bg-[#272729] hover:bg-[#D2D6D9] dark:hover:bg-[#343536] px-3 py-2 rounded-full flex items-center gap-1.5 text-[#46D160] transition-colors">
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Mod Verified</span>
          </Link>
        </div>
      </div>
    </Card>
  );
}
