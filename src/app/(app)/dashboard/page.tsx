import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { skills, users } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AiRecommendations } from "@/components/dashboard/ai-recommendations"

export default function DashboardPage() {
  const currentUser = users.find(u => u.id === '1');

  if (!currentUser) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid gap-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's your personalized dashboard. Ready to learn something new?</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle>AI Content Recommendations</CardTitle>
                <CardDescription>Courses and articles picked just for you based on your skills and interests.</CardDescription>
            </CardHeader>
            <CardContent>
                <AiRecommendations />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Your Skills</CardTitle>
                <CardDescription>A summary of what you can teach and what you want to learn.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-semibold text-sm mb-2">Skills to Teach</h4>
                    <div className="flex flex-wrap gap-2">
                        {currentUser.skillsToTeach.map(skill => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-sm mb-2">Skills to Learn</h4>
                    <div className="flex flex-wrap gap-2">
                        {currentUser.skillsToLearn.map(skill => (
                            <Badge key={skill} variant="outline">{skill}</Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight font-headline">Explore Skills</h2>
          <Link href="/explore">
            <Button variant="ghost">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.slice(0, 4).map(skill => (
            <Card key={skill.id} className="group overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Link href="/explore">
                <CardContent className="p-0">
                  <Image src={skill.imageUrl} alt={skill.name} width={300} height={200} className="w-full h-32 object-cover" data-ai-hint="abstract technology" />
                  <div className="p-4">
                    <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">{skill.category}</Badge>
                    <h3 className="font-bold">{skill.name}</h3>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
