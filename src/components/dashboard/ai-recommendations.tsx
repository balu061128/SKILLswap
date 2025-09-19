'use client';

import { recommendContent } from '@/ai/flows/ai-powered-content-recommendations';
import { users } from '@/lib/data';
import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

type Recommendation = {
    recommendedContent: string[];
    reasoning: string;
};

export function AiRecommendations() {
    const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
    const [loading, setLoading] = useState(true);
    const currentUser = users[0];

    useEffect(() => {
        async function getRecommendations() {
            setLoading(true);
            try {
                // In a real app, this data would be dynamic
                const result = await recommendContent({
                    userSkills: currentUser.skillsToTeach.concat(currentUser.skillsToLearn),
                    userInterests: currentUser.interests,
                    contentFormatPreferences: ['video', 'article', 'interactive tutorial'],
                    pastInteractions: ['React for Beginners course']
                });
                setRecommendation(result);
            } catch (error) {
                console.error("Failed to get AI recommendations:", error);
                setRecommendation({ 
                    recommendedContent: ["Advanced React Patterns", "Data Science with Python", "UX Design Fundamentals"], 
                    reasoning: "Based on your existing skills and interests, these topics will help you grow.\n- React Patterns builds on your current knowledge.\n- Data Science aligns with your learning goals.\n- UX Fundamentals can complement your development skills."
                });
            } finally {
                setLoading(false);
            }
        }
        getRecommendations();
    }, [currentUser]);

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                    <div className="flex items-start gap-4" key={i}>
                        <Skeleton className="h-8 w-8 mt-1 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (!recommendation || recommendation.recommendedContent.length === 0) {
        return <p className="text-sm text-muted-foreground">No recommendations available at this time.</p>;
    }

    return (
        <div className="space-y-4">
            <ul className="space-y-3">
                {recommendation.recommendedContent.slice(0, 3).map((content, index) => (
                    <li key={index} className="flex items-start gap-4 hover:bg-secondary p-2 rounded-lg transition-colors">
                        <div className="bg-primary/10 text-primary p-2 mt-1 rounded-full">
                            <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="font-semibold">{content}</p>
                            <p className="text-sm text-muted-foreground">{recommendation.reasoning.split('\n')[index + 1]?.replace('-', '').trim() || ''}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
