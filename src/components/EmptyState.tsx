
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddCourse: () => void;
}

const EmptyState = ({ onAddCourse }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 px-4 animate-fade-in">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="rounded-full bg-primary/10 p-5 mb-8 shadow-lg">
          <PlusCircle className="h-14 w-14 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">No courses yet</h2>
        <p className="text-muted-foreground text-base mb-10">
          Get started by adding your first course to track attendance.
        </p>
        <Button 
          onClick={onAddCourse} 
          className="btn-transition flex items-center gap-2 px-8 py-6 h-auto"
          size="lg"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Add Your First Course</span>
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
