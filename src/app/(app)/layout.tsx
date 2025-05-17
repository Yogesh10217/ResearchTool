import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/common/logo';
import Link from 'next/link';
import { FileText, ShieldAlert, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/research-paper-generator', label: 'Research Paper Generator', icon: FileText },
  { href: '/fake-news-detector', label: 'Fake News Detector', icon: ShieldAlert },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader className="p-4">
            <Logo iconSize={6} textSize="lg" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} passHref legacyBehavior>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={{ children: item.label, side: 'right', align: 'center' }}
                    >
                      <a>
                        <item.icon aria-hidden="true" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 md:hidden">
            {/* Mobile header content - SidebarTrigger is part of Sidebar component or can be placed here */}
            <SidebarTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </SidebarTrigger>
            <Logo iconSize={5} textSize="base" />
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
