"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Target, Star, Clock, DollarSign, BookOpen, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Course {
  id: string
  name: string
  description: string
  duration: string
  eligibility: string[]
  averageSalary: string
  jobProspects: string
  matchPercentage: number
  category: string
  difficulty: "Easy" | "Medium" | "Hard"
  popularity: number
  keySkills: string[]
  careerPaths: string[]
  topColleges: string[]
}

const sampleCourses: Course[] = [
  {
    id: "computer-science",
    name: "Computer Science Engineering",
    description:
      "Comprehensive program covering programming, algorithms, software development, and emerging technologies like AI and machine learning.",
    duration: "4 years",
    eligibility: ["Science (PCM)", "Mathematics", "Physics", "Chemistry"],
    averageSalary: "₹8-25 LPA",
    jobProspects: "Excellent",
    matchPercentage: 95,
    category: "Engineering",
    difficulty: "Medium",
    popularity: 92,
    keySkills: ["Programming", "Problem Solving", "Data Structures", "Software Development"],
    careerPaths: ["Software Engineer", "Data Scientist", "Product Manager", "Tech Entrepreneur"],
    topColleges: ["IIT Delhi", "IIT Bombay", "BITS Pilani", "VIT Vellore"],
  },
  {
    id: "data-science",
    name: "Data Science & Analytics",
    description:
      "Interdisciplinary field combining statistics, programming, and domain expertise to extract insights from data.",
    duration: "3-4 years",
    eligibility: ["Science (PCM)", "Mathematics", "Statistics"],
    averageSalary: "₹6-20 LPA",
    jobProspects: "Excellent",
    matchPercentage: 88,
    category: "Technology",
    difficulty: "Medium",
    popularity: 85,
    keySkills: ["Statistics", "Python/R", "Machine Learning", "Data Visualization"],
    careerPaths: ["Data Scientist", "Business Analyst", "ML Engineer", "Research Scientist"],
    topColleges: ["ISI Kolkata", "IIT Madras", "IIIT Hyderabad", "Manipal University"],
  },
  {
    id: "graphic-design",
    name: "Graphic Design & Visual Communication",
    description: "Creative program focusing on visual storytelling, branding, digital design, and user experience.",
    duration: "3-4 years",
    eligibility: ["Any Stream", "Portfolio Required"],
    averageSalary: "₹4-12 LPA",
    jobProspects: "Good",
    matchPercentage: 82,
    category: "Design",
    difficulty: "Easy",
    popularity: 78,
    keySkills: ["Adobe Creative Suite", "Typography", "Branding", "UI/UX Design"],
    careerPaths: ["Graphic Designer", "UI/UX Designer", "Brand Manager", "Creative Director"],
    topColleges: ["NID Ahmedabad", "Pearl Academy", "MIT Institute of Design", "Srishti School"],
  },
  {
    id: "business-administration",
    name: "Business Administration (BBA)",
    description: "Comprehensive business education covering management, finance, marketing, and entrepreneurship.",
    duration: "3 years",
    eligibility: ["Any Stream", "Commerce Preferred"],
    averageSalary: "₹5-15 LPA",
    jobProspects: "Good",
    matchPercentage: 75,
    category: "Business",
    difficulty: "Easy",
    popularity: 88,
    keySkills: ["Leadership", "Communication", "Strategic Thinking", "Financial Analysis"],
    careerPaths: ["Business Manager", "Marketing Executive", "Consultant", "Entrepreneur"],
    topColleges: ["Shaheed Sukhdev College", "Christ University", "Symbiosis", "NMIMS"],
  },
  {
    id: "biotechnology",
    name: "Biotechnology",
    description:
      "Interdisciplinary field combining biology and technology to develop products and solutions for healthcare, agriculture, and environment.",
    duration: "4 years",
    eligibility: ["Science (PCB)", "Biology", "Chemistry", "Physics/Math"],
    averageSalary: "₹4-12 LPA",
    jobProspects: "Good",
    matchPercentage: 70,
    category: "Science",
    difficulty: "Hard",
    popularity: 65,
    keySkills: ["Laboratory Skills", "Research Methods", "Molecular Biology", "Data Analysis"],
    careerPaths: ["Research Scientist", "Biotech Engineer", "Quality Control Analyst", "Product Manager"],
    topColleges: ["JNU Delhi", "IIT Roorkee", "VIT Vellore", "SRM University"],
  },
]

export default function RecommendationsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<any>(null)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"match" | "salary" | "popularity">("match")

  useEffect(() => {
    const data = localStorage.getItem("careerPathFormData")
    if (data) {
      setFormData(JSON.parse(data))
    } else {
      router.push("/onboarding")
    }
  }, [router])

  const sortedCourses = [...sampleCourses].sort((a, b) => {
    switch (sortBy) {
      case "match":
        return b.matchPercentage - a.matchPercentage
      case "salary":
        return Number.parseInt(b.averageSalary.split("-")[1]) - Number.parseInt(a.averageSalary.split("-")[1])
      case "popularity":
        return b.popularity - a.popularity
      default:
        return 0
    }
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400"
      case "Medium":
        return "text-yellow-400"
      case "Hard":
        return "text-red-400"
      default:
        return "text-muted-foreground"
    }
  }

  const getMatchColor = (percentage: number) => {
    if (percentage >= 85) return "text-green-400"
    if (percentage >= 70) return "text-yellow-400"
    return "text-orange-400"
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your recommendations...</p>
        </div>
      </div>
    )
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
          <div className="text-sm text-muted-foreground">Step 3 of 3</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">Your Personalized Recommendations</span>
            <span className="text-sm text-muted-foreground">100% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full w-full transition-all duration-300"></div>
          </div>
        </div>

        {/* Header Section */}
        <Card className="bg-card border-border mb-8">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-foreground">Your Perfect Career Matches</CardTitle>
            <CardDescription className="text-muted-foreground text-pretty max-w-2xl mx-auto">
              Based on your academic background in {formData.stream} and your selected interests, we've found{" "}
              {sampleCourses.length} courses that align perfectly with your profile. Each recommendation is personalized
              just for you.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Sort Options */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm text-muted-foreground self-center mr-2">Sort by:</span>
          <Button
            variant={sortBy === "match" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("match")}
            className={sortBy !== "match" ? "bg-transparent" : ""}
          >
            Best Match
          </Button>
          <Button
            variant={sortBy === "salary" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("salary")}
            className={sortBy !== "salary" ? "bg-transparent" : ""}
          >
            Highest Salary
          </Button>
          <Button
            variant={sortBy === "popularity" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("popularity")}
            className={sortBy !== "popularity" ? "bg-transparent" : ""}
          >
            Most Popular
          </Button>
        </div>

        {/* Course Recommendations */}
        <div className="grid gap-6 mb-8">
          {sortedCourses.map((course, index) => (
            <Card key={course.id} className="bg-card border-border hover:border-primary/50 transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl text-foreground">{course.name}</CardTitle>
                      {index === 0 && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Top Match
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {course.description}
                    </CardDescription>
                  </div>
                  <div className="text-right ml-4">
                    <div className={`text-2xl font-bold ${getMatchColor(course.matchPercentage)}`}>
                      {course.matchPercentage}%
                    </div>
                    <div className="text-xs text-muted-foreground">Match</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{course.duration}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{course.averageSalary}</div>
                      <div className="text-xs text-muted-foreground">Average Salary</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{course.jobProspects}</div>
                      <div className="text-xs text-muted-foreground">Job Prospects</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className={`text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </div>
                      <div className="text-xs text-muted-foreground">Difficulty</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Key Skills You'll Develop</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.keySkills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-muted text-muted-foreground">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Career Opportunities</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.careerPaths.map((path) => (
                        <Badge key={path} variant="outline" className="border-primary/20 text-foreground">
                          {path}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link href={`/course/${course.id}`} className="flex-1">
                      <Button className="w-full">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Save for Later
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/interests" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Modify Interests
            </Button>
          </Link>
          <Button className="flex-1">Download Report</Button>
        </div>

        {/* Supportive Message */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground text-pretty max-w-2xl mx-auto">
            Remember, these are recommendations based on your current interests and academic background. Your career
            journey is unique, and it's perfectly normal to explore different paths. We're here to support you every
            step of the way.
          </p>
        </div>
      </div>
    </div>
  )
}
