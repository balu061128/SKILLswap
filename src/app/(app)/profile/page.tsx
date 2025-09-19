import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getFeedbackForUser, getUserById } from "@/lib/data";
import { Edit, Star } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default async function ProfilePage() {
  const user = await getUserById('1');
  
  if (!user) {
    return <div>User not found</div>;
  }

  const feedbacks = await getFeedbackForUser('1');

  const averageRating = feedbacks.length > 0
    ? feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold font-headline">{user.name}</h1>
                <p className="text-muted-foreground mt-1">{user.email}</p>
              </div>
              <Link href="/profile/edit">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </Link>
            </div>
            <p className="mt-4 max-w-prose">{user.bio}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-sm mb-2">Skills to Teach</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skillsToTeach.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">Skills to Learn</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skillsToLearn.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedback & Reviews</CardTitle>
          <CardDescription>What others say about your sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          {feedbacks.length > 0 ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`} />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">{averageRating.toFixed(1)} average rating from {feedbacks.length} reviews</span>
              </div>
              <Separator className="my-4"/>
              <ul className="divide-y divide-border">
                {feedbacks.map(async (f) => {
                  const fromUser = await getUserById(f.fromUserId);
                  return (
                    <li key={f.id} className="py-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                           <AvatarImage src={fromUser?.avatarUrl} alt={fromUser?.name} />
                           <AvatarFallback>{fromUser?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{fromUser?.name}</p>
                             <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < f.rating ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`} />
                                ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 max-w-prose">{f.comment}</p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </>
          ) : (
            <div className="text-center py-8">
                <p className="text-muted-foreground">No feedback yet.</p>
                <p className="text-sm text-muted-foreground">Complete a session to get your first review!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
