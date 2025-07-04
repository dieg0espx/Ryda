"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Bike, User, X } from "lucide-react"
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
  const [isAnimating, setIsAnimating] = useState(false)

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

  const handleClose = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onOpenChange(false)
      setIsAnimating(false)
    }, 200)
  }

  // Get user's motorcycles from profile
  const userBikes = userMotorcycles.map(motorcycle => ({
    id: motorcycle.id,
    name: `${motorcycle.brand} ${motorcycle.model} (${motorcycle.year})`,
    value: `${motorcycle.brand} ${motorcycle.model}`
  }))

  // Add "Other" option
  const bikeOptions = [...userBikes, { id: "other", name: "Other", value: "Other" }]

  if (!open && !isAnimating) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div 
          className={`w-full bg-white rounded-t-2xl shadow-2xl transition-transform duration-200 ease-out ${
            open ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="px-6 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Bike className="w-5 h-5" />
                Join Route
              </h2>
              <button
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
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

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" disabled={loading || !bike || (hasPassenger && !passengerName)}>
                  {loading ? "Joining..." : "Join Route"}
                </Button>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* Bottom safe area for devices with home indicator and bottom navigation */}
          <div className="h-[100px]" />
        </div>
      </div>
    </>
  )
} 