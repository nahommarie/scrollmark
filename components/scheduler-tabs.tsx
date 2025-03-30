"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SchedulerTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export function SchedulerTabs({ activeTab, onTabChange }: SchedulerTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-5 w-[500px] bg-transparent">
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none"
        >
          All Posts
        </TabsTrigger>
        <TabsTrigger
          value="drafts"
          className="data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none"
        >
          Drafts
        </TabsTrigger>
        <TabsTrigger
          value="scheduled"
          className="data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none"
        >
          Scheduled
        </TabsTrigger>
        <TabsTrigger
          value="published"
          className="data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none"
        >
          Published
        </TabsTrigger>
        <TabsTrigger
          value="deleted"
          className="data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none"
        >
          Deleted
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

