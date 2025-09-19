'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { getSessionsForUser, getUserById, getSkillById } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SchedulePage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const sessions = getSessionsForUser('1');

    const upcomingSessions = sessions.filter(s => s.status === 'scheduled' && s.scheduledTime > new Date());
    
    return (
        <div className="grid gap-8 md:grid-cols-3 animate-in fade-in duration-500">
            <div className="md:col-span-2 space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Sessions</CardTitle>
                        <CardDescription>Your scheduled skill-sharing sessions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       {upcomingSessions.length > 0 ? (
                           <ul className="space-y-4">
                               {upcomingSessions.map(session => {
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
                           <div className="text-center py-12 rounded-lg bg-secondary/50">
                               <p className="font-semibold">You have no upcoming sessions.</p>
                               <p className="text-sm text-muted-foreground mt-2">Find a match and schedule a session to get started!</p>
                               <Button asChild size="sm" className="mt-4">
                                   <Link href="/matches">Find a Match</Link>
                               </Button>
                           </div>
                       )}
                    </CardContent>
                </Card>
            </div>
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Schedule a New Session</CardTitle>
                        <CardDescription>Select a date to see availability.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
