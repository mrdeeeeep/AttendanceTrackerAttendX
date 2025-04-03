
import { useState } from "react";
import { Trash2, CheckCircle, XCircle, MinusCircle } from "lucide-react";
import { Course, AttendanceAction } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CourseCardProps {
  course: Course;
  onUpdateAttendance: (id: string, action: AttendanceAction) => void;
  onDeleteCourse: (id: string) => void;
}

const CourseCard = ({
  course,
  onUpdateAttendance,
  onDeleteCourse,
}: CourseCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const attendancePercentage = course.totalClasses === 0
    ? 0
    : Math.round((course.attendedClasses / course.totalClasses) * 100);
  
  // Determine progress color based on percentage
  const getProgressColor = () => {
    if (attendancePercentage >= 75) return "text-attendx-dark-green";
    if (attendancePercentage >= 50) return "text-attendx-dark-blue";
    return "text-attendx-dark-red";
  };

  // Calculate circle properties
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (attendancePercentage / 100) * circumference;

  // Check if decrements are possible
  const canDecreaseAttended = course.attendedClasses > 0;
  const canDecreaseMissed = course.missedClasses > 0;

  return (
    <Card 
      className="overflow-hidden border-zinc-800 bg-zinc-900/90 backdrop-blur-sm animate-scale-in transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-medium text-white">{course.name}</h3>
            <p className="text-zinc-400 text-sm mt-1">
              {course.totalClasses} {course.totalClasses === 1 ? "class" : "classes"} total
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-400 hover:text-destructive transition-colors"
                    onClick={() => onDeleteCourse(course.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete course</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  strokeWidth={strokeWidth}
                  className="fill-none stroke-zinc-800"
                />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  strokeWidth={strokeWidth}
                  className={`fill-none ${getProgressColor()} stroke-current transition-all duration-500 ease-in-out`}
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center text-base font-bold ${getProgressColor()}`}>
                {attendancePercentage}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Attended Section */}
          <div className="bg-zinc-800/70 rounded-lg border border-zinc-700/30">
            <div className="p-3 text-center">
              <span className="text-sm font-medium text-white">Attended</span>
              <div className="text-xl font-semibold text-attendx-dark-green mt-1">
                {course.attendedClasses}
              </div>
            </div>
          </div>
          
          {/* Missed Section */}
          <div className="bg-zinc-800/70 rounded-lg border border-zinc-700/30">
            <div className="p-3 text-center">
              <span className="text-sm font-medium text-white">Missed</span>
              <div className="text-xl font-semibold text-attendx-dark-red mt-1">
                {course.missedClasses}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 border-t border-zinc-800">
        <div className="flex flex-col">
          <Button 
            onClick={() => onUpdateAttendance(course.id, "attended")}
            className="py-3 rounded-none bg-zinc-800/50 hover:bg-zinc-700 text-attendx-dark-green border-r border-zinc-800"
            variant="ghost"
          >
            <CheckCircle size={18} className="mr-2" />
            Attended
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="py-2 rounded-none bg-zinc-800/80 text-attendx-dark-green hover:bg-zinc-700 disabled:opacity-40 border-r border-zinc-800"
                  onClick={() => onUpdateAttendance(course.id, "decrease-attended")}
                  disabled={!canDecreaseAttended}
                >
                  <MinusCircle size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Remove attended class</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex flex-col">
          <Button 
            onClick={() => onUpdateAttendance(course.id, "missed")}
            className="py-3 rounded-none bg-zinc-800/50 hover:bg-zinc-700 text-attendx-dark-red"
            variant="ghost"
          >
            <XCircle size={18} className="mr-2" />
            Missed
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="py-2 rounded-none bg-zinc-800/80 text-attendx-dark-red hover:bg-zinc-700 disabled:opacity-40"
                  onClick={() => onUpdateAttendance(course.id, "decrease-missed")}
                  disabled={!canDecreaseMissed}
                >
                  <MinusCircle size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Remove missed class</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
