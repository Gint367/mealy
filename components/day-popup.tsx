import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface DayPopupProps {
  isOpen: boolean
  onClose: () => void
  date: Date | undefined
  onSave: (date: Date, title: string) => void
  existingEvent?: { title: string }
}

export function DayPopup({ isOpen, onClose, date, onSave, existingEvent }: DayPopupProps) {
  const [eventTitle, setEventTitle] = useState(existingEvent?.title || "")

  useEffect(() => {
    setEventTitle(existingEvent?.title || "")
  }, [existingEvent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (date) {
      onSave(date, eventTitle)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{date?.toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="event-title">Event Title</Label>
            <Input
              id="event-title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

