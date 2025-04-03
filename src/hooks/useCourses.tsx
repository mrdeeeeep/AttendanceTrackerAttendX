
import { useState, useEffect } from "react";
import { Course, AttendanceAction } from "@/types";
import { toast } from "@/hooks/use-toast";

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>(() => {
    // Load courses from localStorage or return empty array
    const savedCourses = localStorage.getItem("attendx-courses");
    if (savedCourses) {
      try {
        // Parse dates correctly
        const parsed = JSON.parse(savedCourses);
        return parsed.map((course: any) => ({
          ...course,
          createdAt: new Date(course.createdAt)
        }));
      } catch (e) {
        console.error("Error parsing saved courses:", e);
        return [];
      }
    }
    return [];
  });

  // Save courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("attendx-courses", JSON.stringify(courses));
  }, [courses]);

  // Add a new course
  const addCourse = (name: string) => {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      name,
      totalClasses: 0,
      attendedClasses: 0,
      missedClasses: 0,
      createdAt: new Date()
    };
    
    setCourses((prev) => [newCourse, ...prev]);
    toast({
      title: "Course added",
      description: `${name} has been added to your courses.`
    });
  };

  // Delete a course
  const deleteCourse = (id: string) => {
    const courseToDelete = courses.find(course => course.id === id);
    if (!courseToDelete) return;
    
    setCourses((prev) => prev.filter((course) => course.id !== id));
    toast({
      title: "Course deleted",
      description: `${courseToDelete.name} has been removed.`
    });
  };

  // Update attendance for a course
  const updateAttendance = (id: string, action: AttendanceAction) => {
    setCourses((prev) =>
      prev.map((course) => {
        if (course.id === id) {
          let updatedCourse = { ...course };
          
          switch (action) {
            case "attended":
              updatedCourse = {
                ...updatedCourse,
                totalClasses: course.totalClasses + 1,
                attendedClasses: course.attendedClasses + 1,
              };
              break;
            case "missed":
              updatedCourse = {
                ...updatedCourse,
                totalClasses: course.totalClasses + 1,
                missedClasses: course.missedClasses + 1,
              };
              break;
            case "decrease-attended":
              if (course.attendedClasses > 0) {
                updatedCourse = {
                  ...updatedCourse,
                  totalClasses: course.totalClasses - 1,
                  attendedClasses: course.attendedClasses - 1,
                };
              }
              break;
            case "decrease-missed":
              if (course.missedClasses > 0) {
                updatedCourse = {
                  ...updatedCourse,
                  totalClasses: course.totalClasses - 1,
                  missedClasses: course.missedClasses - 1,
                };
              }
              break;
          }
          
          // Show toast notification for attendance updates
          const actionText = {
            "attended": "Added attendance",
            "missed": "Marked as missed",
            "decrease-attended": "Decreased attendance",
            "decrease-missed": "Decreased missed classes",
          }[action];
          
          toast({
            title: actionText,
            description: `Updated attendance for ${course.name}`,
          });
          
          return updatedCourse;
        }
        return course;
      })
    );
  };

  return {
    courses,
    addCourse,
    deleteCourse,
    updateAttendance,
  };
};
