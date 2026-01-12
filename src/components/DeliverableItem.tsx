import { Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Image, File, FileSpreadsheet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Deliverable = Tables<'deliverables'>;

interface DeliverableItemProps {
  deliverable: Deliverable;
  index: number;
}

const approvalStyles: Record<string, string> = {
  'Pending': 'bg-warning/15 text-warning border-warning/30',
  'Approved': 'bg-success/15 text-success border-success/30',
  'Needs Revision': 'bg-destructive/15 text-destructive border-destructive/30',
};

const fileIcons: Record<string, typeof File> = {
  'Invoice': FileText,
  'Design Proof': Image,
  'Report': FileSpreadsheet,
  'Contract': FileText,
  'Other': File,
};

export function DeliverableItem({ deliverable, index }: DeliverableItemProps) {
  const { toast } = useToast();
  const FileIcon = fileIcons[deliverable.file_type] || File;

  const handleDownload = () => {
    if (deliverable.file_url) {
      window.open(deliverable.file_url, '_blank');
    } else {
      toast({
        title: 'No file available',
        description: 'This deliverable does not have a file attached.',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-between p-4 rounded-lg bg-card border border-border",
        "hover:shadow-card transition-all duration-200",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${index * 75}ms` }}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary shrink-0">
          <FileIcon className="h-5 w-5 text-secondary-foreground" />
        </div>
        
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground truncate">{deliverable.file_name}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
            <span>{deliverable.file_type}</span>
            {deliverable.file_size && (
              <>
                <span>•</span>
                <span>{deliverable.file_size}</span>
              </>
            )}
            <span>•</span>
            <span>{formatDate(deliverable.created_at)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <Badge 
          variant="outline" 
          className={cn("text-xs font-medium hidden sm:inline-flex", approvalStyles[deliverable.approval_status])}
        >
          {deliverable.approval_status}
        </Badge>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDownload}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download</span>
        </Button>
      </div>
    </div>
  );
}
