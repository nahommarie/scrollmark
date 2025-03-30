"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, addMonths, subMonths } from "date-fns"

interface CalendarHeaderProps {
  currentMonth: Date
  onMonthChange: (date: Date) => void
}

export function CalendarHeader({ currentMonth, onMonthChange }: CalendarHeaderProps) {
  const nextMonth = () => {
    onMonthChange(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    onMonthChange(subMonths(currentMonth, 1))
  }

  const goToToday = () => {
    onMonthChange(new Date())
  }

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="text-xl font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={goToToday}>
          Today
        </Button>
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

