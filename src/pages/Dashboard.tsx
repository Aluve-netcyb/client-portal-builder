import { useAuth } from '@/contexts/AuthContext';
import { getClientProjects } from '@/data/mockData';
import { Header } from '@/components/Header';
import { ProjectCard } from '@/components/ProjectCard';
import { Navigate } from 'react-router-dom';
import { FolderOpen, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  const projects = getClientProjects(user.id);
  
  const stats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'In Progress').length,
    completed: projects.filter(p => p.status === 'Completed').length,
    avgProgress: Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length) || 0,
  };

  const statCards = [
    { label: 'Total Projects', value: stats.total, icon: FolderOpen, color: 'text-accent' },
    { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'text-warning' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-success' },
    { label: 'Avg. Progress', value: `${stats.avgProgress}%`, icon: TrendingUp, color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Welcome back, {user.contactName.split(' ')[0]}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Here's an overview of your projects at {user.companyName}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {statCards.map((stat, index) => (
            <div 
              key={stat.label}
              className="rounded-xl bg-card border border-border p-5 animate-slide-up"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 font-display text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`rounded-lg bg-secondary p-3 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground">Your Projects</h2>
            <span className="text-sm text-muted-foreground">{projects.length} projects</span>
          </div>

          {projects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-card border border-border p-12 text-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No projects yet
              </h3>
              <p className="text-muted-foreground">
                When you have active projects, they'll appear here.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
