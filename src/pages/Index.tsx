import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoginModal } from '@/components/LoginModal';
import { 
  FolderOpen, 
  Shield, 
  Bell, 
  Download, 
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Index = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  const features = [
    {
      icon: FolderOpen,
      title: 'Track Your Projects',
      description: 'See real-time progress updates, milestones, and current phase for all your projects.',
    },
    {
      icon: Download,
      title: 'Download Deliverables',
      description: 'Access and download all your project files, designs, and documents in one place.',
    },
    {
      icon: Bell,
      title: 'Stay Updated',
      description: 'Get notified about important updates, feedback requests, and project changes.',
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Your project data is protected with enterprise-grade security and privacy.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <FolderOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">ClientHub</span>
          </div>
          
          <Button variant="hero" onClick={() => setLoginOpen(true)}>
            Client Login
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--accent)/0.1),transparent_50%)]" />
        
        <div className="container relative py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground mb-6">
              <Sparkles className="h-4 w-4 text-accent" />
              Your Project Command Center
            </div>
            
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Your Projects,{' '}
              <span className="text-accent">All in One Place</span>
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Track progress, download deliverables, and stay connected with your project team through our intuitive client portal.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => setLoginOpen(true)}
                className="w-full sm:w-auto"
              >
                Access Your Portal
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Secure & Private
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Real-time Updates
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                24/7 Access
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A seamless experience designed to keep you informed and in control of your projects.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group rounded-xl bg-card border border-border p-6 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <div className="relative rounded-2xl bg-primary overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--accent)/0.3),transparent_60%)]" />
            
            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
              <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl mx-auto">
                Log in to your client portal and see how your projects are progressing.
              </p>
              <Button 
                variant="accent" 
                size="xl" 
                className="mt-8"
                onClick={() => setLoginOpen(true)}
              >
                Client Login
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <FolderOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-semibold text-foreground">ClientHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ClientHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </div>
  );
};

export default Index;
