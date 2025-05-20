
import { WorkoutData } from "./WorkoutCard";
import WorkoutCard from "./WorkoutCard";

interface WorkoutHistoryProps {
  workouts: WorkoutData[];
  limit?: number;
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ workouts, limit }) => {
  const displayWorkouts = limit ? workouts.slice(0, limit) : workouts;
  
  if (workouts.length === 0) {
    return (
      <div className="bg-workout-light/50 rounded-lg p-6 text-center mt-4">
        <h3 className="text-lg font-medium text-gray-600">No workouts yet</h3>
        <p className="text-muted-foreground mt-1">Start logging your fitness journey</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayWorkouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
};

export default WorkoutHistory;
