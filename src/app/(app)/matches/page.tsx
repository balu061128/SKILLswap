import { SkillMatcher } from "@/components/matches/skill-matcher";

export default function MatchesPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Find Your Perfect Match</h1>
                <p className="text-muted-foreground">Let our AI find the best collaborators for your learning journey.</p>
            </div>
            <SkillMatcher />
        </div>
    );
}
