"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Users, MapPin, Wrench } from "lucide-react"

interface IntroductionProps {
  onComplete: () => void
}

const features = [
  {
    icon: Users,
    title: "Connect with Riders",
    description: "Join a vibrant community of motorcycle enthusiasts. Find riding groups and make lasting friendships.",
  },
  {
    icon: MapPin,
    title: "Discover Routes",
    description: "Explore scenic routes and plan group rides. Share your favorite paths with fellow riders.",
  },
  {
    icon: Wrench,
    title: "Find Services",
    description: "Connect with trusted mechanics and service providers. Get recommendations and book appointments.",
  },
]

export default function Introduction({ onComplete }: IntroductionProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < features.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Status Bar Spacer */}
      <div className="h-6 bg-background"></div>
      
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-3">Welcome to Ryda</h1>
          <p className="text-base text-muted-foreground">Your motorcycle community</p>
        </div>

        {/* Feature Display */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <div className="w-full max-w-sm">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className={`transition-all duration-300 ease-in-out ${
                    index === currentStep ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute"
                  }`}
                  style={{ display: index === currentStep ? "block" : "none" }}
                >
                  <div className="text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-10 h-10 text-accent-foreground" />
                    </div>
                    
                    {/* Content */}
                    <h2 className="text-2xl font-semibold text-foreground mb-4">{feature.title}</h2>
                    <p className="text-muted-foreground leading-relaxed px-4">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {features.map((_, index) => (
            <button
              key={index}
              className={`h-2.5 rounded-full transition-all duration-200 ${
                index === currentStep 
                  ? "bg-orange-600 w-8" 
                  : "bg-muted w-2.5"
              }`}
              onClick={() => goToStep(index)}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="text-muted-foreground disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <span className="text-sm text-muted-foreground">
            {currentStep + 1} of {features.length}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextStep}
            className="text-muted-foreground"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 pb-8 pt-4 border-t border-border">
        <div className="space-y-3">
          <Button 
            onClick={nextStep} 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 rounded-xl font-medium"
          >
            {currentStep === features.length - 1 ? "Get Started" : "Continue"}
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={onComplete}
            className="w-full text-muted-foreground h-10"
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  )
}
