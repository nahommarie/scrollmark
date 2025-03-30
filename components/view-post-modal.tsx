"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Post } from "./social-scheduler"
import Image from "next/image"

interface ViewPostModalProps {
  isOpen: boolean
  onClose: () => void
  post: Post
  onUpdatePost: (post: Post) => void
  onDeletePost: (postId: string) => void
}

export function ViewPostModal({ isOpen, onClose, post, onUpdatePost, onDeletePost }: ViewPostModalProps) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [platform, setPlatform] = useState(post.platform)
  const [image, setImage] = useState<string | null>(post.image)
  const [isEditing, setIsEditing] = useState(false)

  // Update state when post changes
  useEffect(() => {
    setTitle(post.title)
    setContent(post.content)
    setPlatform(post.platform)
    setImage(post.image)
    setIsEditing(false)
  }, [post])

  const handleUpdate = () => {
    onUpdatePost({
      ...post,
      title,
      content,
      platform,
      image,
    })
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      onDeletePost(post.id)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Post" : "Scheduled Post"}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={isEditing ? "edit" : "view"} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="view" onClick={() => setIsEditing(false)}>
              View
            </TabsTrigger>
            <TabsTrigger value="edit" onClick={() => setIsEditing(true)}>
              Edit
            </TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="space-y-4 py-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">
                {format(post.date, "MMMM d, yyyy")} • {post.platform}
              </p>
            </div>

            <div className="border rounded-md p-4 whitespace-pre-wrap">{post.content}</div>

            {post.image && (
              <div className="mt-4">
                <div className="relative h-[200px] w-full overflow-hidden rounded-md">
                  <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="edit" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Post Title</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What do you want to share?"
                required
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-platform">Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-image">Image URL (optional)</Label>
              <Input
                id="edit-image"
                value={image || ""}
                onChange={(e) => setImage(e.target.value || null)}
                placeholder="Enter image URL"
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} className="bg-purple-600 hover:bg-purple-700">
                Update Post
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

