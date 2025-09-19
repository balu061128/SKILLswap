import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Users, BrainCircuit } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center font-headline" prefetch={false}>
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">SkillSwap Connect</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
          <Button asChild>
            <Link href="/signup">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    Unlock Your Potential Through Peer Learning
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                    SkillSwap Connect is the platform where you can share your expertise and learn new skills from a global community of peers.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/signup">
                      Join the Community
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/skillswap-hero/600/600"
                width="600"
                height="600"
                alt="Two people collaborating on a project"
                data-ai-hint="collaboration learning"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last animate-in fade-in zoom-in-50 duration-1000 delay-200"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Why SkillSwap Connect?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed to make skill sharing easy, effective, and enjoyable. Here's what sets us apart.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center p-6 rounded-lg hover:bg-background/50 transition-colors duration-300">
                <Users className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Skill Matching</h3>
                <p className="text-sm text-muted-foreground">Our AI-powered engine connects you with the perfect partner based on your skills and learning goals.</p>
              </div>
              <div className="grid gap-1 text-center p-6 rounded-lg hover:bg-background/50 transition-colors duration-300">
                <Zap className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Live Sessions</h3>
                <p className="text-sm text-muted-foreground">Engage in real-time collaboration with integrated chat and video for a hands-on learning experience.</p>
              </div>
              <div className="grid gap-1 text-center p-6 rounded-lg hover:bg-background/50 transition-colors duration-300">
                <BrainCircuit className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold">AI Recommendations</h3>
                <p className="text-sm text-muted-foreground">Get personalized suggestions for learning materials to supplement your skill-sharing journey.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 SkillSwap Connect. All rights reserved.</p>
      </footer>
    </div>
  );
}
