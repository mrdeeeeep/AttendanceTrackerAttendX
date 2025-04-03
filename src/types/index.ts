
export interface Course {
  id: string;
  name: string;
  totalClasses: number;
  attendedClasses: number;
  missedClasses: number;
  createdAt: Date;
}

export type AttendanceAction = "attended" | "missed" | "decrease-attended" | "decrease-missed";
