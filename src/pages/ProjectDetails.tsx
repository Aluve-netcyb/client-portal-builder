import { useParams, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getProjectById, getProjectDeliverables } from '@/data/mockData';
import { Header } from '@/components/Header';
import { DeliverableItem } from '@/components/DeliverableItem';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

const statusStyles = {
  'Not Started': 'bg-muted text-muted-foreground',
  'In Progress': 'bg-warning/15 text-warning border-warning/30',
  'Behind Schedule': 'bg-destructive/15 text-destructive border-destructive/30',
  'Completed': 'bg-success/15 text-success border-success/30',
};

const phaseStyles = {
  'Planning': 'bg-secondary text-secondary-foreground',
  'Design': 'bg-accent/15 text-accent',
  'Development': 'bg-primary/10 text-primary',
  'Review': 'bg-warning/15 text-warning',
  'Completed': 'bg-success/15 text-success',
};

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const project = getProjectById(projectId || '');
  
  if (!project) {
    return <Navigate to="/dashboard" replace />;
  }

  const deliverables = getProjectDeliverables(project.id);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const phases = ['Planning', 'Design', 'Development', 'Review', 'Completed'];
  const currentPhaseIndex = phases.indexOf(project.currentPhase);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Back Button */}
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="mb-6 gap-2 -ml-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Project Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {project.name}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
                {project.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className={cn("text-sm font-medium", statusStyles[project.status])}>
                {project.status}
              </Badge>
              <Badge variant="secondary" className={cn("text-sm font-medium", phaseStyles[project.currentPhase])}>
                {project.currentPhase}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <div className="rounded-xl bg-card border border-border p-6 animate-slide-up">
              <h2 className="font-display text-lg font-semibold text-foreground mb-6">Project Progress</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Overall Completion</span>
                  <span className="font-display text-2xl font-bold text-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>

              {/* Phase Timeline */}
              <div className="flex items-center justify-between relative">
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
                {phases.map((phase, index) => (
                  <div key={phase} className="relative flex flex-col items-center z-10">
                    <div 
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors",
                        index < currentPhaseIndex 
                          ? "bg-success border-success text-success-foreground"
                          : index === currentPhaseIndex
                          ? "bg-accent border-accent text-accent-foreground"
                          : "bg-card border-border text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </div>
                    <span className={cn(
                      "mt-2 text-xs font-medium text-center",
                      index <= currentPhaseIndex ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {phase}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Section */}
            <div className="rounded-xl bg-card border border-border p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-semibold text-foreground">Deliverables</h2>
                <span className="text-sm text-muted-foreground">{deliverables.length} files</span>
              </div>

              {deliverables.length > 0 ? (
                <div className="space-y-3">
                  {deliverables.map((deliverable, index) => (
                    <DeliverableItem key={deliverable.id} deliverable={deliverable} index={index} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No deliverables uploaded yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details Card */}
            <div className="rounded-xl bg-card border border-border p-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">Project Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                    <Calendar className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-medium text-foreground">{formatDate(project.startDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                    <Clock className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-medium text-foreground">{formatDate(project.dueDate)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl bg-card border border-border p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Send Feedback
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;
