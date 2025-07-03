"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, X, ChevronLeft, ChevronRight } from "lucide-react"
import { createRoute } from "@/lib/routes-storage"
import { toast } from "sonner"

interface CreateRouteFormProps {
  onRouteCreated: () => void
}

const steps = [
  {
    id: 1,
    title: "Basic Information",
    description: "Let's start with the basics"
  },
  {
    id: 2,
    title: "Route Details",
    description: "Tell us about the route"
  },
  {
    id: 3,
    title: "Location & Time",
    description: "Where and when"
  },
  {
    id: 4,
    title: "Highlights & Requirements",
    description: "What to expect"
  },
  {
    id: 5,
    title: "Review & Create",
    description: "Final step"
  }
]

export default function CreateRouteForm({ onRouteCreated }: CreateRouteFormProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    distance: "",
    duration: "",
    startLocation: "",
    endLocation: "",
    date: "",
    time: "",
    maxParticipants: 10,
    meetingPoint: "",
    highlights: [""],
    requirements: [""],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const newRoute = createRoute({
        ...formData,
        currentParticipants: 0,
        rating: 0,
        creator: {
          name: "Test User",
          avatar: "/placeholder-user.jpg",
          rating: 4.5,
          ridesLed: 5,
        },
        participants: [],
        mapImage: "/placeholder.svg?height=200&width=400&text=Route+Map",
      })

      toast.success("Route created successfully!")
      setOpen(false)
      resetForm()
      onRouteCreated()
    } catch (error) {
      console.error("Error creating route:", error)
      toast.error("Failed to create route")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      difficulty: "Beginner",
      distance: "",
      duration: "",
      startLocation: "",
      endLocation: "",
      date: "",
      time: "",
      maxParticipants: 10,
      meetingPoint: "",
      highlights: [""],
      requirements: [""],
    })
    setCurrentStep(1)
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, ""]
    }))
  }

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }))
  }

  const updateHighlight = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => i === index ? value : h)
    }))
  }

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, ""]
    }))
  }

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }))
  }

  const updateRequirement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((r, i) => i === index ? value : r)
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Route Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter a catchy title for your route"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what makes this route special"
                required
              />
            </div>
            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={formData.difficulty} onValueChange={(value: "Beginner" | "Intermediate" | "Advanced") => setFormData(prev => ({ ...prev, difficulty: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="distance">Distance</Label>
                <Input
                  id="distance"
                  value={formData.distance}
                  onChange={(e) => setFormData(prev => ({ ...prev, distance: e.target.value }))}
                  placeholder="e.g., 120 miles"
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 4 hours"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startLocation">Start Location</Label>
                <Input
                  id="startLocation"
                  value={formData.startLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, startLocation: e.target.value }))}
                  placeholder="e.g., San Francisco, CA"
                  required
                />
              </div>
              <div>
                <Label htmlFor="endLocation">End Location</Label>
                <Input
                  id="endLocation"
                  value={formData.endLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, endLocation: e.target.value }))}
                  placeholder="e.g., Napa Valley, CA"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="maxParticipants">Max Participants</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  min="1"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || 1 }))}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="meetingPoint">Meeting Point</Label>
              <Input
                id="meetingPoint"
                value={formData.meetingPoint}
                onChange={(e) => setFormData(prev => ({ ...prev, meetingPoint: e.target.value }))}
                placeholder="e.g., Golden Gate Bridge Parking Area"
                required
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>Highlights</Label>
              <div className="space-y-2">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      placeholder="Route highlight"
                    />
                    {formData.highlights.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeHighlight(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addHighlight} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Highlight
                </Button>
              </div>
            </div>

            <div>
              <Label>Requirements</Label>
              <div className="space-y-2">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={requirement}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      placeholder="Route requirement"
                    />
                    {formData.requirements.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeRequirement(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addRequirement} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Requirement
                </Button>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-lg">{formData.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{formData.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Difficulty:</span> {formData.difficulty}
                </div>
                <div>
                  <span className="font-medium">Distance:</span> {formData.distance}
                </div>
                <div>
                  <span className="font-medium">Duration:</span> {formData.duration}
                </div>
                <div>
                  <span className="font-medium">Max Participants:</span> {formData.maxParticipants}
                </div>
              </div>
              <div className="text-sm">
                <span className="font-medium">Route:</span> {formData.startLocation} → {formData.endLocation}
              </div>
              <div className="text-sm">
                <span className="font-medium">Date & Time:</span> {formData.date} at {formData.time}
              </div>
              <div className="text-sm">
                <span className="font-medium">Meeting Point:</span> {formData.meetingPoint}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen)
      if (!newOpen) {
        resetForm()
      }
    }}>
      <DialogTrigger asChild>
        <Button size="icon" className="text-orange-500" variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto z-[200]">
        <DialogHeader>
          <div className="space-y-2">
            <DialogTitle>{steps[currentStep - 1].title}</DialogTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">{steps[currentStep - 1].description}</p>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  index + 1 <= currentStep 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {index + 1}
                </div>
                <span className="mt-1 hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={loading} className="flex items-center gap-2">
                {loading ? "Creating..." : "Create Route"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 