
import { useState } from "react";
import { Plus, BookOpen, Calendar, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/useCourses";
import CourseCard from "@/components/CourseCard";
import AddCourseDialog from "@/components/AddCourseDialog";
import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";
import { AttendanceAction } from "@/types";

const Index = () => {
  const { courses, addCourse, deleteCourse, updateAttendance } = useCourses();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  const handleDeleteCourse = (id: string) => {
    setCourseToDelete(id);
  };

  const confirmDeleteCourse = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete);
      setCourseToDelete(null);
    }
  };

  const handleUpdateAttendance = (id: string, action: AttendanceAction) => {
    updateAttendance(id, action);
  };

  // Calculate attendance stats
  const totalCourses = courses.length;
  const totalClasses = courses.reduce((sum, course) => sum + course.totalClasses, 0);
  const totalAttended = courses.reduce((sum, course) => sum + course.attendedClasses, 0);
  const averageAttendance = totalClasses === 0 
    ? 0 
    : Math.round((totalAttended / totalClasses) * 100);

  return (
    <div className="min-h-screen bg-zinc-950 transition-colors duration-300 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-3xl font-bold heading-gradient">AttendX</h1>
            </div>
            
            {courses.length > 0 && (
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="btn-transition flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                <span>Add Course</span>
              </Button>
            )}
          </header>

          {courses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Total Courses</p>
                  <p className="text-2xl font-bold text-white">{totalCourses}</p>
                </div>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex items-center gap-4">
                <div className="rounded-full bg-attendx-dark-green/10 p-3">
                  <Calendar className="h-6 w-6 text-attendx-dark-green" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Total Classes</p>
                  <p className="text-2xl font-bold text-white">{totalClasses}</p>
                </div>
              </div>
              
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex items-center gap-4">
                <div className="rounded-full bg-attendx-dark-blue/10 p-3">
                  <BarChart className="h-6 w-6 text-attendx-dark-blue" />
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Avg. Attendance</p>
                  <p className="text-2xl font-bold text-white">{averageAttendance}%</p>
                </div>
              </div>
            </div>
          )}

          {courses.length === 0 ? (
            <EmptyState onAddCourse={() => setIsAddDialogOpen(true)} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onUpdateAttendance={handleUpdateAttendance}
                  onDeleteCourse={handleDeleteCourse}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />

      <AddCourseDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddCourse={addCourse}
      />

      <ConfirmDialog
        isOpen={!!courseToDelete}
        onClose={() => setCourseToDelete(null)}
        onConfirm={confirmDeleteCourse}
        title="Delete Course"
        description="Are you sure you want to delete this course? This action cannot be undone and all attendance data will be lost."
      />
    </div>
  );
};

export default Index;
