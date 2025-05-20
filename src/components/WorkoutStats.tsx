
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, Calendar, DumbbellIcon, Timer } from "lucide-react";
import { WorkoutData } from "./WorkoutCard";

interface WorkoutStatsProps {
  workouts: WorkoutData[];
}

const WorkoutStats: React.FC<WorkoutStatsProps> = ({ workouts }) => {
  // Calculate stats
  const totalWorkouts = workouts.length;
  
  const currentMonth = new Date().getMonth();
  const workoutsThisMonth = workouts.filter(
    (w) => new Date(w.date).getMonth() === currentMonth
  ).length;
  
  const totalMinutes = workouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );
  
  const workoutTypes = workouts.reduce<Record<string, number>>((acc, workout) => {
    acc[workout.type] = (acc[workout.type] || 0) + 1;
    return acc;
  }, {});
  
  const favoriteWorkout = Object.entries(workoutTypes).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          <DumbbellIcon className="h-6 w-6 text-workout-primary mb-2" />
          <p className="text-2xl font-bold">{totalWorkouts}</p>
          <p className="text-xs text-muted-foreground text-center">Total Workouts</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          <Calendar className="h-6 w-6 text-workout-primary mb-2" />
          <p className="text-2xl font-bold">{workoutsThisMonth}</p>
          <p className="text-xs text-muted-foreground text-center">This Month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          <Timer className="h-6 w-6 text-workout-primary mb-2" />
          <p className="text-2xl font-bold">{totalMinutes}</p>
          <p className="text-xs text-muted-foreground text-center">Total Minutes</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center h-full">
          <Activity className="h-6 w-6 text-workout-primary mb-2" />
          <p className="text-md font-bold truncate w-full text-center">{favoriteWorkout}</p>
          <p className="text-xs text-muted-foreground text-center">Favorite Workout</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutStats;
