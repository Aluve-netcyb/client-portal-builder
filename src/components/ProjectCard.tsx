import { Project } from '@/data/mockData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number;
}

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

export function ProjectCard({ project, index }: ProjectCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Link to={`/project/${project.id}`}>
      <Card 
        className={cn(
          "group cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 bg-card border-border",
          "animate-slide-up"
        )}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={cn("text-xs font-medium", statusStyles[project.status])}>
              {project.status}
            </Badge>
            <Badge variant="secondary" className={cn("text-xs font-medium", phaseStyles[project.currentPhase])}>
              {project.currentPhase}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>Started {formatDate(project.startDate)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Due {formatDate(project.dueDate)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
