import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { users } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Send } from "lucide-react"

export default function MessagesPage() {
    const conversations = users.filter(u => u.id !== '1').slice(0, 3);
    const selectedConversation = conversations[0];
    const currentUser = users.find(u => u.id === '1');

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[calc(100vh-8rem)] animate-in fade-in duration-500">
            {/* Conversation List */}
            <Card className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col">
                <CardHeader className="p-4">
                    <CardTitle className="text-xl">Messages</CardTitle>
                    <div className="relative mt-2">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search..." className="pl-8" />
                    </div>
                </CardHeader>
                <CardContent className="p-0 flex-grow overflow-auto">
                    <ul className="divide-y">
                        {conversations.map(user => (
                            <li key={user.id} className="p-3 flex items-center gap-3 hover:bg-secondary cursor-pointer transition-colors border-l-4 border-transparent hover:border-primary">
                                <Avatar>
                                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                                    <AvatarFallback>{user.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow overflow-hidden">
                                    <p className="font-semibold truncate">{user.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">Hey, are you free this weekend?</p>
                                </div>
                                <span className="text-xs text-muted-foreground">2h</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col">
                {selectedConversation ? (
                    <>
                        <CardHeader className="flex flex-row items-center gap-4 p-4 border-b">
                            <Avatar>
                                <AvatarImage src={selectedConversation.avatarUrl} alt={selectedConversation.name} />
                                <AvatarFallback>{selectedConversation.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <p className="font-semibold">{selectedConversation.name}</p>
                                <p className="text-xs text-muted-foreground">Online</p>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow p-6 space-y-6 overflow-auto">
                            {/* Messages */}
                            <div className="flex items-end gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={selectedConversation.avatarUrl} />
                                    <AvatarFallback>{selectedConversation.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="max-w-xs p-3 rounded-lg bg-secondary">
                                    <p>Hey, I saw you're teaching React. I'd love to learn!</p>
                                    <p className="text-xs text-muted-foreground mt-1 text-right">10:00 AM</p>
                                </div>
                            </div>
                            <div className="flex items-end gap-3 justify-end">
                                <div className="max-w-xs p-3 rounded-lg bg-primary text-primary-foreground">
                                    <p>Awesome! I'd be happy to teach you. When are you available?</p>
                                    <p className="text-xs text-primary-foreground/80 mt-1 text-right">10:01 AM</p>
                                </div>
                                 <Avatar className="h-8 w-8">
                                    <AvatarImage src={currentUser?.avatarUrl} />
                                    <AvatarFallback>{currentUser?.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                </Avatar>
                            </div>
                             <div className="flex items-end gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={selectedConversation.avatarUrl} />
                                    <AvatarFallback>{selectedConversation.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="max-w-xs p-3 rounded-lg bg-secondary">
                                    <p>How about this weekend? Saturday afternoon?</p>
                                    <p className="text-xs text-muted-foreground mt-1 text-right">10:02 AM</p>
                                </div>
                            </div>
                        </CardContent>
                        <div className="p-4 border-t">
                            <div className="relative">
                                <Input placeholder="Type your message..." className="pr-12" />
                                <Button size="icon" className="absolute top-1/2 right-1.5 -translate-y-1/2 h-7 w-7">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <MessageSquare className="h-16 w-16 text-muted-foreground/50" />
                        <p className="mt-4 text-lg font-semibold">Select a conversation</p>
                        <p className="text-muted-foreground">Start chatting with your matches.</p>
                    </div>
                )}
            </Card>
        </div>
    )
}
