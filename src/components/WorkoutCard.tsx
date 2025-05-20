
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock, DumbbellIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface WorkoutData {
  id: string;
  date: string;
  type: string;
  duration: number;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    weight?: number;
  }[];
}

interface WorkoutCardProps {
  workout: WorkoutData;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const formattedDate = new Date(workout.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const formatDuration = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}min`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="bg-workout-light p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-workout-primary">
            {workout.type}
          </CardTitle>
          <Badge variant="outline" className="bg-white text-workout-primary border-workout-primary">
            {workout.exercises.length} {workout.exercises.length === 1 ? 'exercise' : 'exercises'}
          </Badge>
        </div>
        <div className="flex text-sm text-gray-600 mt-1 space-x-4">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{formatDuration(workout.duration)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-2">
          {workout.exercises.slice(0, 3).map((exercise, index) => (
            <li key={index} className="text-sm flex justify-between">
              <span className="font-medium">{exercise.name}</span>
              <span className="text-muted-foreground">
                {exercise.sets} sets × {exercise.reps} reps
                {exercise.weight && ` @ ${exercise.weight}kg`}
              </span>
            </li>
          ))}
          {workout.exercises.length > 3 && (
            <li className="text-sm text-workout-primary font-medium">
              + {workout.exercises.length - 3} more exercises
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
