'use client';

import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Home,
  Users,
  Calendar,
  Sparkles,
  Settings,
  BrainCircuit,
  MessageSquare,
  PlusSquare,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/explore', label: 'Explore', icon: Users },
    { href: '/matches', label: 'Find Matches', icon: Sparkles },
    { href: '/schedule', label: 'My Schedule', icon: Calendar },
    { href: '/messages', label: 'Messages', icon: MessageSquare },
    { href: '/profile', label: 'My Profile', icon: Settings },
  ];

  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-headline">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">SkillSwap</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{children: item.label, side:"right"}}
                className="w-full justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={{children: "Create Room", side:"right"}}
                className="w-full justify-start"
              >
                <a href="https://c0desync.netlify.app" target="_blank" rel="noopener noreferrer">
                  <PlusSquare className="h-5 w-5" />
                  <span>Create Room</span>
                </a>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
            <h4 className="font-bold text-sm mb-2">Ready to teach?</h4>
            <p className="text-xs text-muted-foreground mb-3">List your skill and start connecting with learners today.</p>
            <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">List a Skill</Button>
        </div>
      </SidebarFooter>
    </>
  );
}
