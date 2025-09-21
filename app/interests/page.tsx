"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Target, Heart, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Interest {
  id: string
  name: string
  description: string
  category: string
  icon: string
}

const interestCategories = [
  { id: "all", name: "All Interests", count: 0 },
  { id: "technology", name: "Technology", count: 0 },
  { id: "creative", name: "Creative Arts", count: 0 },
  { id: "business", name: "Business & Finance", count: 0 },
  { id: "science", name: "Science & Research", count: 0 },
  { id: "social", name: "Social Impact", count: 0 },
  { id: "health", name: "Health & Medicine", count: 0 },
]

const allInterests: Interest[] = [
  {
    id: "programming",
    name: "Programming & Coding",
    description: "Building software and applications",
    category: "technology",
    icon: "💻",
  },
  {
    id: "ai-ml",
    name: "Artificial Intelligence",
    description: "Machine learning and AI development",
    category: "technology",
    icon: "🤖",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "Protecting digital systems and data",
    category: "technology",
    icon: "🔒",
  },
  {
    id: "web-design",
    name: "Web Design",
    description: "Creating beautiful and functional websites",
    category: "technology",
    icon: "🎨",
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Analyzing data to find insights",
    category: "technology",
    icon: "📊",
  },

  {
    id: "graphic-design",
    name: "Graphic Design",
    description: "Visual communication and branding",
    category: "creative",
    icon: "🎨",
  },
  {
    id: "photography",
    name: "Photography",
    description: "Capturing moments and stories",
    category: "creative",
    icon: "📸",
  },
  {
    id: "writing",
    name: "Creative Writing",
    description: "Storytelling and content creation",
    category: "creative",
    icon: "✍️",
  },
  {
    id: "music",
    name: "Music Production",
    description: "Creating and producing music",
    category: "creative",
    icon: "🎵",
  },
  {
    id: "filmmaking",
    name: "Film & Video",
    description: "Creating visual stories and content",
    category: "creative",
    icon: "🎬",
  },

  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    description: "Starting and running businesses",
    category: "business",
    icon: "🚀",
  },
  {
    id: "finance",
    name: "Finance & Investment",
    description: "Managing money and investments",
    category: "business",
    icon: "💰",
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    description: "Promoting products and services online",
    category: "business",
    icon: "📈",
  },
  {
    id: "consulting",
    name: "Business Consulting",
    description: "Helping businesses solve problems",
    category: "business",
    icon: "💼",
  },

  {
    id: "research",
    name: "Scientific Research",
    description: "Discovering new knowledge",
    category: "science",
    icon: "🔬",
  },
  {
    id: "biotechnology",
    name: "Biotechnology",
    description: "Using biology to solve problems",
    category: "science",
    icon: "🧬",
  },
  {
    id: "environmental",
    name: "Environmental Science",
    description: "Protecting our planet",
    category: "science",
    icon: "🌱",
  },
  {
    id: "physics",
    name: "Physics & Astronomy",
    description: "Understanding the universe",
    category: "science",
    icon: "🌌",
  },

  {
    id: "education",
    name: "Teaching & Education",
    description: "Helping others learn and grow",
    category: "social",
    icon: "📚",
  },
  {
    id: "social-work",
    name: "Social Work",
    description: "Supporting communities and individuals",
    category: "social",
    icon: "🤝",
  },
  { id: "ngo", name: "Non-Profit Work", description: "Making a positive social impact", category: "social", icon: "❤️" },
  { id: "psychology", name: "Psychology", description: "Understanding human behavior", category: "social", icon: "🧠" },

  {
    id: "medicine",
    name: "Medicine & Surgery",
    description: "Healing and treating patients",
    category: "health",
    icon: "⚕️",
  },
  { id: "nursing", name: "Nursing", description: "Caring for patients and families", category: "health", icon: "👩‍⚕️" },
  { id: "pharmacy", name: "Pharmacy", description: "Medication and drug development", category: "health", icon: "💊" },
  {
    id: "physiotherapy",
    name: "Physiotherapy",
    description: "Helping people recover and move",
    category: "health",
    icon: "🏃‍♂️",
  },
]

export default function InterestsPage() {
  const router = useRouter()
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredInterests, setFilteredInterests] = useState(allInterests)

  useEffect(() => {
    let filtered = allInterests

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((interest) => interest.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (interest) =>
          interest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          interest.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredInterests(filtered)
  }, [activeCategory, searchQuery])

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId],
    )
  }

  const handleContinue = () => {
    if (selectedInterests.length >= 3) {
      // Store selected interests
      const existingData = JSON.parse(localStorage.getItem("careerPathFormData") || "{}")
      const updatedData = { ...existingData, interests: selectedInterests }
      localStorage.setItem("careerPathFormData", JSON.stringify(updatedData))
      router.push("/recommendations")
    }
  }

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return allInterests.length
    return allInterests.filter((interest) => interest.category === categoryId).length
  }

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
          <div className="text-sm text-muted-foreground">Step 2 of 3</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">Select Your Interests</span>
            <span className="text-sm text-muted-foreground">67% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full w-2/3 transition-all duration-300"></div>
          </div>
        </div>

        <Card className="bg-card border-border mb-8">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-foreground">What interests you?</CardTitle>
            <CardDescription className="text-muted-foreground text-pretty max-w-2xl mx-auto">
              Select at least 3 areas that genuinely interest you. Don't worry about being "practical" - choose what
              excites you! We'll help you find career paths that align with your passions.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Search and Filter */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search interests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {interestCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className={activeCategory === category.id ? "" : "bg-transparent"}
                  >
                    {category.name} ({getCategoryCount(category.id)})
                  </Button>
                ))}
              </div>
            </div>

            {/* Selected Interests Counter */}
            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Selected: {selectedInterests.length} interests</span>
                <span className="text-sm text-muted-foreground">
                  {selectedInterests.length < 3 ? `Select ${3 - selectedInterests.length} more` : "Great selection!"}
                </span>
              </div>
              {selectedInterests.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedInterests.map((interestId) => {
                    const interest = allInterests.find((i) => i.id === interestId)
                    return interest ? (
                      <Badge key={interestId} variant="default" className="bg-primary text-primary-foreground">
                        {interest.icon} {interest.name}
                      </Badge>
                    ) : null
                  })}
                </div>
              )}
            </div>

            {/* Interests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredInterests.map((interest) => (
                <Card
                  key={interest.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    selectedInterests.includes(interest.id)
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{interest.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{interest.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{interest.description}</p>
                      </div>
                      {selectedInterests.includes(interest.id) && (
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredInterests.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No interests found matching your search.</p>
                <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-2 bg-transparent">
                  Clear search
                </Button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/onboarding" className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Details
                </Button>
              </Link>
              <Button onClick={handleContinue} disabled={selectedInterests.length < 3} className="flex-1">
                Get My Recommendations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Supportive Message */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground text-pretty max-w-2xl mx-auto">
            Remember, there's no "wrong" choice here. Your interests can evolve, and many successful careers combine
            multiple areas. We're here to help you explore all the possibilities that match your unique profile.
          </p>
        </div>
      </div>
    </div>
  )
}
