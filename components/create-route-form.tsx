"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
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
    description: "Route details and description"
  },
  {
    id: 2,
    title: "Route Details",
    description: "Location, timing, and participants"
  },
  {
    id: 3,
    title: "Review & Create",
    description: "Final review and creation"
  }
]

export default function CreateRouteForm({ onRouteCreated }: CreateRouteFormProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [noMaxParticipants, setNoMaxParticipants] = useState(false)
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
        maxParticipants: noMaxParticipants ? -1 : formData.maxParticipants,
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
    setNoMaxParticipants(false)
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
          <div className="space-y-6">
            {/* Basic Route Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Route Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a catchy title for your route"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what makes this route special"
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Route Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="difficulty">Difficulty Level *</Label>
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
              <div>
                <Label htmlFor="distance">Distance *</Label>
                <Input
                  id="distance"
                  value={formData.distance}
                  onChange={(e) => setFormData(prev => ({ ...prev, distance: e.target.value }))}
                  placeholder="e.g., 120 miles"
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 4 hours"
                  required
                />
              </div>
            </div>

            {/* Route Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startLocation">Start Location *</Label>
                <Input
                  id="startLocation"
                  value={formData.startLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, startLocation: e.target.value }))}
                  placeholder="e.g., San Francisco, CA"
                  required
                />
              </div>
              <div>
                <Label htmlFor="endLocation">End Location *</Label>
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

      case 2:
        return (
          <div className="space-y-6">
            {/* Timing and Participants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="meetingPoint">Meeting Point *</Label>
              <Input
                id="meetingPoint"
                value={formData.meetingPoint}
                onChange={(e) => setFormData(prev => ({ ...prev, meetingPoint: e.target.value }))}
                placeholder="e.g., Golden Gate Bridge Parking Area"
                required
              />
            </div>

            {/* Participants Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="noMaxParticipants"
                  checked={noMaxParticipants}
                  onCheckedChange={(checked) => setNoMaxParticipants(checked as boolean)}
                />
                <Label htmlFor="noMaxParticipants" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  No maximum participants limit
                </Label>
              </div>
              
              {!noMaxParticipants && (
                <div>
                  <Label htmlFor="maxParticipants">Maximum Participants *</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="1"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || 1 }))}
                    required
                  />
                </div>
              )}
            </div>

            {/* Highlights and Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Button type="button" variant="outline" onClick={addHighlight} className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950">
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
                  <Button type="button" variant="outline" onClick={addRequirement} className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-300 dark:hover:bg-orange-950">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Requirement
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-black border border-neutral-300 dark:border-white rounded-xl p-6 space-y-4">
              <div className="text-center">
                <h3 className="font-bold text-xl text-neutral-900 dark:text-white">{formData.title}</h3>
                <p className="text-neutral-700 dark:text-white mt-2">{formData.description}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-3 bg-white dark:bg-black border border-neutral-300 dark:border-white rounded-lg">
                  <div className="font-semibold text-neutral-900 dark:text-white">Difficulty</div>
                  <div className="text-neutral-700 dark:text-white">{formData.difficulty}</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-black border border-neutral-300 dark:border-white rounded-lg">
                  <div className="font-semibold text-neutral-900 dark:text-white">Distance</div>
                  <div className="text-neutral-700 dark:text-white">{formData.distance}</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-black border border-neutral-300 dark:border-white rounded-lg">
                  <div className="font-semibold text-neutral-900 dark:text-white">Duration</div>
                  <div className="text-neutral-700 dark:text-white">{formData.duration}</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-black border border-neutral-300 dark:border-white rounded-lg">
                  <div className="font-semibold text-neutral-900 dark:text-white">Max Riders</div>
                  <div className="text-neutral-700 dark:text-white">
                    {noMaxParticipants ? "No limit" : formData.maxParticipants}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 p-3 bg-white dark:bg-black border border-neutral-300 dark:border-white rounded-lg">
                  <span className="font-semibold text-neutral-900 dark:text-white">Route:</span>
                  <span className="text-neutral-700 dark:text-white">{formData.startLocation} → {formData.endLocation}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white dark:bg-black border border-neutral-300 dark:border-white rounded-lg">
                  <span className="font-semibold text-neutral-900 dark:text-white">Date & Time:</span>
                  <span className="text-neutral-700 dark:text-white">{formData.date} at {formData.time}</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white dark:bg-black border border-neutral-300 dark:border-white rounded-lg">
                  <span className="font-semibold text-neutral-900 dark:text-white">Meeting Point:</span>
                  <span className="text-neutral-700 dark:text-white">{formData.meetingPoint}</span>
                </div>
              </div>

              {formData.highlights.filter(h => h.trim()).length > 0 && (
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white mb-2">Highlights:</div>
                  <div className="flex flex-wrap gap-2">
                    {formData.highlights.filter(h => h.trim()).map((highlight, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 rounded-full text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {formData.requirements.filter(r => r.trim()).length > 0 && (
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white mb-2">Requirements:</div>
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements.filter(r => r.trim()).map((requirement, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 rounded-full text-sm">
                        {requirement}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
        <Button size="icon" className="text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950" variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="!fixed !inset-x-0 !top-0 !w-full !h-full !max-w-none !max-h-none !rounded-none !p-0 !left-0 !transform-none bg-white dark:bg-black backdrop-blur-md border-0 md:!max-w-3xl md:!max-h-[90vh] md:!inset-auto md:!top-1/2 md:!left-1/2 md:!transform md:!-translate-x-1/2 md:!-translate-y-1/2 md:rounded-lg">
        <DialogHeader className="flex-shrink-0 p-4 md:p-6 pb-4 border-b border-neutral-300 dark:border-white bg-white/80 dark:bg-black/80 backdrop-blur-sm">
          <div className="space-y-2">
            <DialogTitle className="text-xl text-neutral-900 dark:text-white">{steps[currentStep - 1].title}</DialogTitle>
            <p className="text-sm text-neutral-600 dark:text-white">{steps[currentStep - 1].description}</p>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full rounded-full h-3 mt-4">
            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between text-xs text-neutral-600 dark:text-white mt-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  index + 1 <= currentStep 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                    : 'bg-white dark:bg-black border border-neutral-300 dark:border-white'
                }`}>
                  {index + 1}
                </div>
                <span className="mt-2 hidden sm:block text-center max-w-20">{step.title}</span>
              </div>
            ))}
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 pt-4 pb-20 md:pb-6 mb-[130px]">
          <div className="space-y-6">
            {renderStep()}
          </div>
        </form>

        {/* Fixed Footer */}
        <div className="fixed bottom-[100px] left-0 right-0 p-4 pb-4 md:p-6 pt-4 border-t border-neutral-300 dark:border-white bg-white/80 dark:bg-black/80 backdrop-blur-sm md:relative md:flex-shrink-0 md:bottom-0">
          <div className="flex justify-between">
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
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                {loading ? "Creating..." : "Create Route"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 