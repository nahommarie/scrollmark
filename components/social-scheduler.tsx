"use client"

import { useState } from "react"
import { CalendarView } from "@/components/calendar-view"
import { SchedulerHeader } from "@/components/scheduler-header"
import { SchedulerTabs } from "@/components/scheduler-tabs"

export type Post = {
  id: string
  title: string
  content: string
  date: Date
  platform: string
  image: string | null
}

// Sample data for scheduled posts
const INITIAL_POSTS = [
  {
    id: "1",
    title: "Product Launch",
    content: "Excited to announce our new product line!",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    platform: "Twitter",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    title: "Weekly Update",
    content: "Check out what we've been working on this week.",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
    platform: "Instagram",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    title: "Customer Spotlight",
    content: "Featuring our amazing customer success stories!",
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5),
    platform: "LinkedIn",
    image: null,
  },
]

export function SocialScheduler() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [activeTab, setActiveTab] = useState("scheduled")

  // Function to add a new post
  const handleAddPost = (post: Omit<Post, "id">) => {
    const newPost = {
      ...post,
      id: Math.random().toString(36).substring(2, 9),
    }
    setPosts([...posts, newPost])
  }

  // Function to update an existing post
  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
  }

  // Function to delete a post
  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <SchedulerHeader
        onCreatePost={() => {
          const today = new Date()
          handleAddPost({
            title: "New Post",
            content: "",
            date: today,
            platform: "Twitter",
            image: null,
          })
        }}
      />

{/* TODO: incorporate the post status filters */}
      {/* <SchedulerTabs activeTab={activeTab} onTabChange={setActiveTab} /> */}

      <div className="mt-4 bg-white rounded-lg shadow-sm border">
        <CalendarView
          posts={posts}
          onAddPost={handleAddPost}
          onUpdatePost={handleUpdatePost}
          onDeletePost={handleDeletePost}
        />
      </div>
    </div>
  )
}

