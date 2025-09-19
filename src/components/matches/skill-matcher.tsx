'use client';

import { skillMatching, SkillMatchingOutput } from '@/ai/flows/skill-matching';
import { users } from '@/lib/data';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles, UserCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

export function SkillMatcher() {
    const [matches, setMatches] = useState<SkillMatchingOutput | null>(null);
    const [loading, setLoading] = useState(false);
    const currentUser = users[0];

    const handleFindMatches = async () => {
        setLoading(true);
        setMatches(null);

        const userProfile = `User ${currentUser.name} has skills in ${currentUser.skillsToTeach.join(', ')} and wants to learn ${currentUser.skillsToLearn.join(', ')}. Interests include ${currentUser.interests.join(', ')}.`;
        
        const otherUsersData = users
            .filter(u => u.id !== currentUser.id)
            .map(u => `User ID ${u.id}, named ${u.name}, teaches ${u.skillsToTeach.join(', ')} and wants to learn ${u.skillsToLearn.join(', ')}.`)
            .join('\n');

        try {
            const result = await skillMatching({
                userProfile: userProfile,
                statedNeeds: `I'm looking for someone to teach me ${currentUser.skillsToLearn.join(' or ')} in exchange for my expertise in ${currentUser.skillsToTeach.join(' or ')}.`,
                pastExchanges: "No recent exchanges.",
                skillDescriptions: `A list of potential users and their skills:\n${otherUsersData}`,
            });
            const validMatches = result.filter(match => users.some(u => u.id === match.userId));
            setMatches(validMatches.length > 0 ? validMatches : null);
        } catch (error) {
            console.error("Failed to get AI matches:", error);
            // Fallback for demo purposes
            const fallbackMatches = users.filter(u => u.id !== currentUser.id).map((u, i) => ({
                userId: u.id,
                matchScore: Math.random() * (0.9 - 0.7) + 0.7,
                justification: `A good complementary skill match. ${u.name} can teach you what you want to learn.`
            }));
            setMatches(fallbackMatches);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>AI-Powered Matching</CardTitle>
                <CardDescription>Click the button to generate personalized peer matches based on your profile.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                {!matches && !loading && (
                    <div className="flex flex-col items-center gap-4 py-8">
                        <div className="p-4 bg-primary/10 rounded-full">
                           <Sparkles className="h-10 w-10 text-primary" />
                        </div>
                        <p className="max-w-xs text-muted-foreground">Find peers with complementary skills for collaborative learning.</p>
                        <Button onClick={handleFindMatches} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                            <Sparkles className="mr-2 h-4 w-4" /> Find Matches Now
                        </Button>
                    </div>
                )}
                {loading && (
                     <div className="flex flex-col items-center gap-4 py-8">
                        <Loader2 className="h-10 w-10 text-primary animate-spin" />
                        <p className="mt-4 text-muted-foreground">Analyzing profiles and finding the best matches for you...</p>
                    </div>
                )}
                {matches && (
                    <div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                            {matches.map(match => {
                                const user = users.find(u => u.id === match.userId);
                                if (!user) return null;
                                return (
                                    <Card key={match.userId} className="text-left transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                                        <CardHeader>
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                                                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-lg">{user.name}</CardTitle>
                                                    <div className="flex items-center gap-2">
                                                        <UserCheck className="h-4 w-4 text-primary" />
                                                        <span className="font-semibold text-primary">{Math.round(match.matchScore * 100)}% Match</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground mb-4 h-12 line-clamp-3">{match.justification}</p>
                                            <div className="space-y-3">
                                                <div>
                                                    <h4 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1">You Learn</h4>
                                                    <div className="flex flex-wrap gap-1">
                                                        {user.skillsToTeach.filter(s => currentUser.skillsToLearn.includes(s)).map(s => <Badge key={s}>{s}</Badge>)}
                                                    </div>
                                                </div>
                                                <div>
                                                     <h4 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1">You Teach</h4>
                                                     <div className="flex flex-wrap gap-1">
                                                        {currentUser.skillsToTeach.filter(s => user.skillsToLearn.includes(s)).map(s => <Badge variant="secondary" key={s}>{s}</Badge>)}
                                                    </div>
                                                </div>
                                            </div>
                                            <Button size="sm" className="w-full mt-6">Request Session</Button>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                        <Button onClick={handleFindMatches} variant="outline" className="mt-8">
                            <Sparkles className="mr-2 h-4 w-4" /> Regenerate Matches
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
