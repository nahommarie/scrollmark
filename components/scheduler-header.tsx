"use client"

import { Search, MoreVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SchedulerHeaderProps {
  onCreatePost: () => void
}

export function SchedulerHeader({ onCreatePost }: SchedulerHeaderProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-bold">Social Scheduler</h1>

      <div className="flex items-center gap-2">
        {/* <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-[200px] pl-8 rounded-full bg-white" />
        </div> */}

        {/* <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button> */}

        <Button className="bg-purple-600 hover:bg-purple-700" onClick={onCreatePost}>
          <Plus className="mr-2 h-4 w-4" />
          Log Offline Post
        </Button>
      </div>
    </div>
  )
}

