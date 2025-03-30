"use client"

import type React from "react"

import { useState } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns"
import { ChevronLeft, ChevronRight, CalendarIcon, Tag, Layers, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddPostModal } from "./add-post-modal"
import { ViewPostModal } from "./view-post-modal"
import type { Post } from "./social-scheduler"

interface CalendarViewProps {
  posts: Post[]
  onAddPost: (post: Omit<Post, "id">) => void
  onUpdatePost: (post: Post) => void
  onDeletePost: (postId: string) => void
}

export function CalendarView({ posts, onAddPost, onUpdatePost, onDeletePost }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const startDate = startOfMonth(currentMonth)
  const endDate = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: startDate, end: endDate })

  // Get the first day of the month to determine the starting position
  const startingDayIndex = startDate.getDay() // 0 for Sunday, 1 for Monday, etc.

  // Calculate the days from the previous month to fill the first row
  const prevMonthDays = Array.from({ length: startingDayIndex }, (_, i) => {
    const date = new Date(startDate)
    date.setDate(-i)
    return date
  }).reverse()

  // Calculate the days for the next month to fill the last row
  const totalCells = 42 // 6 rows of 7 days
  const remainingCells = totalCells - (prevMonthDays.length + days.length)
  const nextMonthDays = Array.from({ length: remainingCells }, (_, i) => {
    const date = new Date(endDate)
    date.setDate(endDate.getDate() + i + 1)
    return date
  })

  // Combine all days
  const allDays = [...prevMonthDays, ...days, ...nextMonthDays]

  // Function to handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setIsAddModalOpen(true)
  }

  // Function to handle post click
  const handlePostClick = (post: Post, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedPost(post)
    setIsViewModalOpen(true)
  }

  // Function to handle add post
  const handleAddPost = (post: Omit<Post, "id">) => {
    onAddPost(post)
    setIsAddModalOpen(false)
  }

  // Get posts for a specific day
  const getPostsForDay = (date: Date) => {
    return posts.filter((post) => isSameDay(post.date, date))
  }

  // Format date range for display
  const formatDateRange = () => {
    const start = format(startDate, "MMM d, yyyy")
    const end = format(endDate, "MMM d, yyyy")
    return `${start} - ${end}`
  }

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            Today
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="text-sm font-medium">{formatDateRange()}</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <Select defaultValue="monthly">
              <SelectTrigger className="h-8 w-[100px] text-xs">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
            <Select defaultValue="all-tags">
              <SelectTrigger className="h-8 w-[100px] text-xs">
                <SelectValue placeholder="Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-tags">All Tags</SelectItem>
                <SelectItem value="important">Important</SelectItem>
                <SelectItem value="promotion">Promotion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center">
            <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
            <Select defaultValue="all-channels">
              <SelectTrigger className="h-8 w-[120px] text-xs">
                <SelectValue placeholder="Channels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-channels">All Channels</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 text-center border-b">
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
          <div key={day} className="py-2 text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-b">
        {allDays.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentMonth)
          const postsForDay = getPostsForDay(date)
          const hasPost = postsForDay.length > 0

          return (
            <div
              key={index}
              className={`min-h-[100px] p-1 border-r border-b relative ${
                isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"
              }`}
              onClick={() => handleDateSelect(date)}
            >
              <div className="text-right p-1">{date.getDate()}</div>

              {hasPost && (
                <div className="mt-1">
                  {postsForDay.map((post) => (
                    <div
                      key={post.id}
                      className="mb-1 p-1 text-xs rounded bg-purple-100 text-purple-800 cursor-pointer truncate"
                      onClick={(e) => handlePostClick(post, e)}
                    >
                      {post.title}
                    </div>
                  ))}
                </div>
              )}

              <div className="absolute bottom-2 right-2">
                <button
                  className="h-6 w-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDateSelect(date)
                  }}
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modals */}
      <AddPostModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPost={handleAddPost}
        selectedDate={selectedDate}
      />

      {selectedPost && (
        <ViewPostModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          post={selectedPost}
          onUpdatePost={onUpdatePost}
          onDeletePost={onDeletePost}
        />
      )}
    </div>
  )
}

