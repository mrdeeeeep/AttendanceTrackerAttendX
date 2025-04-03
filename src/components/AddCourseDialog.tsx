
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddCourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCourse: (name: string) => void;
}

const AddCourseDialog = ({
  isOpen,
  onClose,
  onAddCourse,
}: AddCourseDialogProps) => {
  const [courseName, setCourseName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseName.trim()) {
      setError("Please enter a course name");
      return;
    }
    
    onAddCourse(courseName.trim());
    setCourseName("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setCourseName("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="dialog-backdrop animate-fade-in animate-slide-up sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Enter the name of the course you want to track attendance for.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="courseName" className="mb-2 block">
              Course Name
            </Label>
            <Input
              id="courseName"
              value={courseName}
              onChange={(e) => {
                setCourseName(e.target.value);
                if (e.target.value.trim()) setError("");
              }}
              placeholder="e.g., Mathematics 101"
              className="w-full"
              autoFocus
            />
            {error && <p className="text-destructive text-sm mt-2">{error}</p>}
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="btn-transition"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="btn-transition"
            >
              Add Course
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseDialog;
