"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Bike, User } from "lucide-react"
import { userMotorcycles } from "@/lib/static-data"

interface JoinRouteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onJoin: (data: { bike: string; hasPassenger: boolean; passengerName?: string }) => void
  loading?: boolean
}

export default function JoinRouteDialog({ open, onOpenChange, onJoin, loading }: JoinRouteDialogProps) {
  const [bike, setBike] = useState("")
  const [customBike, setCustomBike] = useState("")
  const [hasPassenger, setHasPassenger] = useState(false)
  const [passengerName, setPassengerName] = useState("")

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setBike("")
      setCustomBike("")
      setHasPassenger(false)
      setPassengerName("")
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedBike = bike === "Other" ? customBike : bike
    onJoin({
      bike: selectedBike,
      hasPassenger,
      passengerName: hasPassenger ? passengerName : undefined
    })
  }

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen)
  }

  // Get user's motorcycles from profile
  const userBikes = userMotorcycles.map(motorcycle => ({
    id: motorcycle.id,
    name: `${motorcycle.brand} ${motorcycle.model} (${motorcycle.year})`,
    value: `${motorcycle.brand} ${motorcycle.model}`
  }))

  // Add "Other" option
  const bikeOptions = [...userBikes, { id: "other", name: "Other", value: "Other" }]

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bike className="w-5 h-5" />
            Join Route
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="bike">Your Motorcycle</Label>
            <Select value={bike} onValueChange={setBike} required>
              <SelectTrigger>
                <SelectValue placeholder="Select your motorcycle" />
              </SelectTrigger>
              <SelectContent>
                {bikeOptions.map((bikeOption) => (
                  <SelectItem key={bikeOption.id} value={bikeOption.value}>
                    {bikeOption.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {bike === "Other" && (
            <div>
              <Label htmlFor="customBike">Custom Motorcycle</Label>
              <Input
                id="customBike"
                value={customBike}
                onChange={(e) => setCustomBike(e.target.value)}
                placeholder="Enter your motorcycle model"
                required
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasPassenger"
              checked={hasPassenger}
              onCheckedChange={(checked) => setHasPassenger(checked as boolean)}
            />
            <Label htmlFor="hasPassenger" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              I'm bringing a passenger
            </Label>
          </div>

          {hasPassenger && (
            <div>
              <Label htmlFor="passengerName">Passenger Name</Label>
              <Input
                id="passengerName"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                placeholder="Enter passenger name"
                required
              />
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={loading || !bike || (hasPassenger && !passengerName)}>
              {loading ? "Joining..." : "Join Route"}
            </Button>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 