"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Target,
  Star,
  Clock,
  DollarSign,
  BookOpen,
  TrendingUp,
  CheckCircle,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface CourseDetail {
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
  curriculum: {
    year: number
    subjects: string[]
  }[]
  admissionProcess: string[]
  jobRoles: {
    title: string
    description: string
    averageSalary: string
    companies: string[]
  }[]
  prerequisites: string[]
  futureScope: string[]
}

const courseDetails: Record<string, CourseDetail> = {
  "computer-science": {
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
    curriculum: [
      {
        year: 1,
        subjects: ["Programming Fundamentals", "Mathematics", "Physics", "Digital Logic", "Communication Skills"],
      },
      {
        year: 2,
        subjects: ["Data Structures", "Computer Organization", "Database Systems", "Operating Systems", "Statistics"],
      },
      {
        year: 3,
        subjects: ["Algorithms", "Software Engineering", "Computer Networks", "Machine Learning", "Web Development"],
      },
      {
        year: 4,
        subjects: ["Artificial Intelligence", "Cybersecurity", "Mobile Development", "Project Work", "Internship"],
      },
    ],
    admissionProcess: [
      "JEE Main qualification required",
      "JEE Advanced for IITs",
      "State-level entrance exams (BITSAT, VITEEE, etc.)",
      "Direct admission based on 12th marks in some colleges",
      "Counseling and seat allocation",
    ],
    jobRoles: [
      {
        title: "Software Engineer",
        description: "Design, develop, and maintain software applications and systems",
        averageSalary: "₹6-20 LPA",
        companies: ["Google", "Microsoft", "Amazon", "Flipkart", "TCS"],
      },
      {
        title: "Data Scientist",
        description: "Analyze complex data to help companies make better decisions",
        averageSalary: "₹8-25 LPA",
        companies: ["Netflix", "Uber", "Swiggy", "Paytm", "IBM"],
      },
      {
        title: "Product Manager",
        description: "Lead product development and strategy for tech companies",
        averageSalary: "₹12-35 LPA",
        companies: ["Facebook", "LinkedIn", "Zomato", "PhonePe", "Razorpay"],
      },
    ],
    prerequisites: [
      "Strong foundation in Mathematics",
      "Basic understanding of Physics",
      "Logical thinking and problem-solving skills",
      "Interest in technology and programming",
    ],
    futureScope: [
      "Artificial Intelligence and Machine Learning",
      "Cybersecurity and Ethical Hacking",
      "Cloud Computing and DevOps",
      "Blockchain Technology",
      "Internet of Things (IoT)",
      "Quantum Computing",
    ],
  },
  "data-science": {
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
    curriculum: [
      {
        year: 1,
        subjects: ["Statistics", "Mathematics", "Programming Basics", "Data Structures", "Business Fundamentals"],
      },
      {
        year: 2,
        subjects: ["Machine Learning", "Database Systems", "Data Visualization", "Probability", "Research Methods"],
      },
      {
        year: 3,
        subjects: [
          "Deep Learning",
          "Big Data Analytics",
          "Natural Language Processing",
          "Time Series",
          "Capstone Project",
        ],
      },
    ],
    admissionProcess: [
      "Entrance exams like JEE Main, BITSAT",
      "Some colleges have dedicated Data Science entrance tests",
      "Portfolio and interview for specialized programs",
      "Merit-based admission in some universities",
    ],
    jobRoles: [
      {
        title: "Data Scientist",
        description: "Extract insights from complex datasets using statistical and ML techniques",
        averageSalary: "₹8-22 LPA",
        companies: ["Google", "Amazon", "Flipkart", "Ola", "Paytm"],
      },
      {
        title: "Business Analyst",
        description: "Analyze business data to help organizations make informed decisions",
        averageSalary: "₹5-15 LPA",
        companies: ["Deloitte", "McKinsey", "Accenture", "EY", "KPMG"],
      },
    ],
    prerequisites: [
      "Strong mathematical foundation",
      "Basic programming knowledge",
      "Statistical thinking",
      "Curiosity about data patterns",
    ],
    futureScope: [
      "Artificial Intelligence",
      "Business Intelligence",
      "Predictive Analytics",
      "Data Engineering",
      "Research and Academia",
    ],
  },
}

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  const [course, setCourse] = useState<CourseDetail | null>(null)

  useEffect(() => {
    if (courseId && courseDetails[courseId]) {
      setCourse(courseDetails[courseId])
    }
  }, [courseId])

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course details...</p>
        </div>
      </div>
    )
  }

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
          <Link href="/recommendations">
            <Button variant="outline" size="sm" className="bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Recommendations
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Course Header */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <CardTitle className="text-3xl text-foreground">{course.name}</CardTitle>
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    {course.matchPercentage}% Match
                  </Badge>
                </div>
                <CardDescription className="text-lg text-muted-foreground leading-relaxed mb-4">
                  {course.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {course.keySkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-muted text-muted-foreground">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="lg:w-80">
                <Card className="bg-muted/50 border-border">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <Clock className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                        <div className="text-sm font-medium text-foreground">{course.duration}</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                      <div className="text-center">
                        <DollarSign className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                        <div className="text-sm font-medium text-foreground">{course.averageSalary}</div>
                        <div className="text-xs text-muted-foreground">Avg Salary</div>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                        <div className="text-sm font-medium text-foreground">{course.jobProspects}</div>
                        <div className="text-xs text-muted-foreground">Job Market</div>
                      </div>
                      <div className="text-center">
                        <BookOpen className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                        <div className={`text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>
                          {course.difficulty}
                        </div>
                        <div className="text-xs text-muted-foreground">Difficulty</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Popularity</span>
                        <span className="text-foreground">{course.popularity}%</span>
                      </div>
                      <Progress value={course.popularity} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-muted">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="colleges">Colleges</TabsTrigger>
            <TabsTrigger value="admission">Admission</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    Prerequisites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    Future Scope
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.futureScope.map((scope, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{scope}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {course.eligibility.map((criteria) => (
                    <Badge key={criteria} variant="outline" className="border-primary/20 text-foreground">
                      {criteria}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Course Curriculum</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Year-wise breakdown of subjects and topics you'll study
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {course.curriculum.map((year) => (
                    <div key={year.year} className="border-l-2 border-primary/20 pl-4">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Year {year.year}</h3>
                      <div className="grid md:grid-cols-2 gap-2">
                        {year.subjects.map((subject) => (
                          <div key={subject} className="flex items-center">
                            <BookOpen className="w-4 h-4 text-primary mr-2" />
                            <span className="text-muted-foreground">{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="careers" className="space-y-6">
            <div className="grid gap-6">
              {course.jobRoles.map((role) => (
                <Card key={role.title} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-foreground">{role.title}</CardTitle>
                        <CardDescription className="text-muted-foreground mt-1">{role.description}</CardDescription>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">{role.averageSalary}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Top Hiring Companies</h4>
                      <div className="flex flex-wrap gap-2">
                        {role.companies.map((company) => (
                          <Badge key={company} variant="secondary" className="bg-muted text-muted-foreground">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="colleges" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Top Colleges</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Recommended institutions for this course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.topColleges.map((college, index) => (
                    <div key={college} className="flex items-center p-3 border border-border rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{college}</div>
                        <div className="text-sm text-muted-foreground">Highly Recommended</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admission" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Admission Process</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Step-by-step guide to get admission in this course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.admissionProcess.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-bold text-primary-foreground">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-muted-foreground">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/recommendations" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Recommendations
            </Button>
          </Link>
          <Button className="flex-1">Save This Course</Button>
          <Button className="flex-1">Download Course Guide</Button>
        </div>

        {/* Supportive Message */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground text-pretty max-w-2xl mx-auto">
            Still have questions about this course? Remember that choosing a career path is a journey, not a
            destination. We're here to support you in exploring all your options and finding what truly excites you.
          </p>
        </div>
      </div>
    </div>
  )
}
