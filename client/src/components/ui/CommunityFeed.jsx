import React, { useState, useEffect } from 'react';
import { RedditPost } from './RedditPost';
import { PostComposer } from './PostComposer';
import { Card, CardContent } from './Card';

const mockPosts = [
  {
    id: 1,
    title: "Annual Sports Day 2026 - Registration Open!",
    author: "Admin",
    timeAgo: "2 hours ago",
    flair: "Announcement",
    flairType: "green",
    content: "Students from grades 6 to 12 can now register for the upcoming Annual Sports Day. Please fill out the forms before Friday.",
    initialUpvotes: 42,
    commentCount: 5,
    isPinned: true
  },
  {
    id: 2,
    title: "Science Fair Projects - Final Call",
    author: "Mr. Sharma (Physics)",
    timeAgo: "4 hours ago",
    flair: "Academics",
    flairType: "skyblue",
    content: "Just a reminder that all science fair projects are due this Friday. Need help? I'll be in the lab after school today.",
    initialUpvotes: 18,
    commentCount: 12,
    isPinned: false
  },
  {
    id: 3,
    title: "Lost Water Bottle near Library",
    author: "StudentUser99",
    timeAgo: "1 day ago",
    flair: "General",
    flairType: "default",
    content: "I left a blue milton water bottle near the library entrance. If anyone finds it, please let me know!",
    initialUpvotes: 5,
    commentCount: 2,
    isPinned: false
  }
];

export function CommunityFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCreatePost = (newPost) => {
    // Optimistic UI update
    const optimisticPost = {
      id: Date.now(),
      title: "New Discussion",
      author: "Student (You)",
      timeAgo: "Just now",
      content: newPost.content,
      initialUpvotes: 1,
      commentCount: 0,
      isPinned: false
    };
    
    setPosts([optimisticPost, ...posts]);
  };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-4 sm:space-y-6 pb-20">
      {/* ARIA live region for announcements */}
      <div aria-live="polite" className="sr-only">
        {posts.length > 0 && !loading ? "Feed updated with new posts." : ""}
      </div>

      <PostComposer onSubmit={handleCreatePost} />
      
      <div className="space-y-4" role="feed" aria-busy={loading}>
        {loading ? (
          // Skeleton Loaders
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={`skeleton-${i}`} className="overflow-hidden animate-pulse" aria-hidden="true">
              <CardContent className="p-4 space-y-4">
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-[#EDEFF1] dark:bg-[#343536]"></div>
                  <div className="w-24 h-3 rounded bg-[#EDEFF1] dark:bg-[#343536]"></div>
                  <div className="w-16 h-3 rounded bg-[#EDEFF1] dark:bg-[#343536]"></div>
                </div>
                <div className="w-3/4 h-5 rounded bg-[#EDEFF1] dark:bg-[#343536]"></div>
                <div className="space-y-2">
                  <div className="w-full h-3 rounded bg-[#EDEFF1] dark:bg-[#343536]"></div>
                  <div className="w-5/6 h-3 rounded bg-[#EDEFF1] dark:bg-[#343536]"></div>
                </div>
                <div className="flex gap-4 pt-2">
                  <div className="w-16 h-8 rounded-full bg-[#EAEDEF] dark:bg-[#272729]"></div>
                  <div className="w-16 h-8 rounded-full bg-[#EAEDEF] dark:bg-[#272729]"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : posts.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No posts yet - Be the first to welcome new students!
          </div>
        ) : (
          posts.map(post => (
            <article key={post.id} aria-label={`Post by ${post.author}`}>
              <RedditPost {...post} />
            </article>
          ))
        )}
      </div>
    </div>
  );
}
