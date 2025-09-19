import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { getSessionsForUser, getUserById, getSkillById, skills, users } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AiRecommendations } from "@/components/dashboard/ai-recommendations"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardPage() {
  const currentUser = users.find(u => u.id === '1');
  const sessions = getSessionsForUser('1');
  const upcomingSessions = sessions.filter(s => s.status === 'scheduled' && s.scheduledTime > new Date());


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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled skill-sharing sessions.</CardDescription>
          </CardHeader>
          <CardContent>
              {upcomingSessions.length > 0 ? (
                  <ul className="space-y-4">
                      {upcomingSessions.slice(0, 3).map(session => {
                          const otherUserId = session.teacherId === '1' ? session.learnerId : session.teacherId;
                          const otherUser = getUserById(otherUserId);
                          const skill = getSkillById(session.skillId);
                          const role = session.teacherId === '1' ? 'Teaching' : 'Learning';

                          return (
                              <li key={session.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                                  <div className="flex items-center gap-4">
                                      <Avatar className="h-10 w-10">
                                          <AvatarImage src={otherUser?.avatarUrl} />
                                          <AvatarFallback>{otherUser?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                          <p className="font-semibold">{skill?.name}</p>
                                          <p className="text-sm text-muted-foreground">with {otherUser?.name}</p>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                                      <Badge variant={role === 'Teaching' ? 'default' : 'secondary'}>{role}</Badge>
                                      <div className="text-sm text-right">
                                          <p>{session.scheduledTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                                          <p className="text-muted-foreground">{session.scheduledTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</p>
                                      </div>
                                  </div>
                              </li>
                          )
                      })}
                  </ul>
              ) : (
                  <div className="text-center py-12 rounded-lg border-2 border-dashed">
                      <p className="font-semibold">You have no upcoming sessions.</p>
                      <p className="text-sm text-muted-foreground mt-2">Find a match and schedule a session to get started!</p>
                      <Button asChild size="sm" className="mt-4">
                          <Link href="/matches">Find a Match</Link>
                      </Button>
                  </div>
              )}
          </CardContent>
        </Card>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight font-headline">Explore Skills</h2>
            <Link href="/explore">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4">
            {skills.slice(0, 2).map(skill => (
              <Card key={skill.id} className="group overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <Link href="/explore">
                  <CardContent className="p-0 flex items-center gap-4">
                    <Image src={skill.imageUrl} alt={skill.name} width={120} height={80} className="w-24 h-20 object-cover" data-ai-hint="abstract technology" />
                    <div className="p-2">
                      <Badge className="mb-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20" variant="outline">{skill.category}</Badge>
                      <h3 className="font-bold text-sm">{skill.name}</h3>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
