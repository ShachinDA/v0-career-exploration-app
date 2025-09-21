"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowRight, ArrowLeft, Target, User, GraduationCap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FormData {
  name: string
  age: string
  stream: string
  subjects: string[]
  percentage: string
  preferredLocation: string
  budget: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    stream: "",
    subjects: [],
    percentage: "",
    preferredLocation: "",
    budget: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.age) newErrors.age = "Age is required"
    if (!formData.stream) newErrors.stream = "Stream is required"
    if (!formData.percentage) newErrors.percentage = "Percentage is required"
    if (!formData.preferredLocation) newErrors.preferredLocation = "Preferred location is required"
    if (!formData.budget) newErrors.budget = "Budget preference is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Store form data in localStorage for now
      localStorage.setItem("careerPathFormData", JSON.stringify(formData))
      router.push("/interests")
    }
  }

  const streams = [
    { value: "science", label: "Science (PCM/PCB)" },
    { value: "commerce", label: "Commerce" },
    { value: "arts", label: "Arts/Humanities" },
  ]

  const budgetRanges = [
    { value: "low", label: "Under ₹2 Lakhs per year" },
    { value: "medium", label: "₹2-5 Lakhs per year" },
    { value: "high", label: "₹5-10 Lakhs per year" },
    { value: "premium", label: "Above ₹10 Lakhs per year" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CareerPath</span>
          </Link>
          <div className="text-sm text-muted-foreground">Step 1 of 3</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">Academic Details</span>
            <span className="text-sm text-muted-foreground">33% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full w-1/3 transition-all duration-300"></div>
          </div>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-foreground">Tell us about yourself</CardTitle>
            <CardDescription className="text-muted-foreground text-pretty">
              Help us understand your academic background so we can provide personalized career recommendations that
              match your profile.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`bg-input border-border ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-foreground">
                      Age *
                    </Label>
                    <Select value={formData.age} onValueChange={(value) => handleInputChange("age", value)}>
                      <SelectTrigger className={`bg-input border-border ${errors.age ? "border-destructive" : ""}`}>
                        <SelectValue placeholder="Select your age" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 5 }, (_, i) => i + 16).map((age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age} years
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                  Academic Background
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Current Stream *</Label>
                    <RadioGroup
                      value={formData.stream}
                      onValueChange={(value) => handleInputChange("stream", value)}
                      className="grid grid-cols-1 gap-3"
                    >
                      {streams.map((stream) => (
                        <div key={stream.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={stream.value} id={stream.value} />
                          <Label htmlFor={stream.value} className="text-foreground cursor-pointer">
                            {stream.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.stream && <p className="text-sm text-destructive">{errors.stream}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="percentage" className="text-foreground">
                      Current Academic Percentage *
                    </Label>
                    <Input
                      id="percentage"
                      type="number"
                      placeholder="e.g., 85"
                      min="0"
                      max="100"
                      value={formData.percentage}
                      onChange={(e) => handleInputChange("percentage", e.target.value)}
                      className={`bg-input border-border ${errors.percentage ? "border-destructive" : ""}`}
                    />
                    {errors.percentage && <p className="text-sm text-destructive">{errors.percentage}</p>}
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Preferences</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-foreground">
                      Preferred Study Location *
                    </Label>
                    <Select
                      value={formData.preferredLocation}
                      onValueChange={(value) => handleInputChange("preferredLocation", value)}
                    >
                      <SelectTrigger
                        className={`bg-input border-border ${errors.preferredLocation ? "border-destructive" : ""}`}
                      >
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="same-city">Same city</SelectItem>
                        <SelectItem value="same-state">Same state</SelectItem>
                        <SelectItem value="anywhere-india">Anywhere in India</SelectItem>
                        <SelectItem value="abroad">Abroad</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.preferredLocation && <p className="text-sm text-destructive">{errors.preferredLocation}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-foreground">Budget Range *</Label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger className={`bg-input border-border ${errors.budget ? "border-destructive" : ""}`}>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href="/" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
                <Button type="submit" className="flex-1">
                  Continue to Interests
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Supportive Message */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground text-pretty">
            Don't worry if you're unsure about some details. We'll help you explore all possibilities and find the
            perfect career path that matches your interests and goals.
          </p>
        </div>
      </div>
    </div>
  )
}
