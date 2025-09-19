import { users, skills } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function ExplorePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Explore the Community</h1>
        <p className="text-muted-foreground">Find new skills to learn and talented people to learn from.</p>
      </div>
      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="users">People</TabsTrigger>
        </TabsList>
        <TabsContent value="skills">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
            {skills.map((skill) => (
              <Card key={skill.id} className="group overflow-hidden transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                 <Link href="#">
                    <CardContent className="p-0">
                    <Image src={skill.imageUrl} alt={skill.name} width={300} height={200} className="w-full h-40 object-cover" data-ai-hint="abstract technology" />
                    <div className="p-4">
                        <Badge variant="secondary" className="mb-2">{skill.category}</Badge>
                        <h3 className="font-bold text-lg">{skill.name}</h3>
                    </div>
                    </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="users">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {users.map((user) => (
              <Card key={user.id} className="text-center transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-6 flex flex-col items-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2 h-10">{user.bio}</p>
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">TEACHES</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {user.skillsToTeach.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="default">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                   <Button asChild variant="outline" size="sm" className="mt-6 w-full">
                     <Link href={`/profile`}>View Profile</Link>
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
