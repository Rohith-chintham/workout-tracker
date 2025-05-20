
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { WorkoutData } from "./WorkoutCard";

interface WorkoutFormProps {
  onSave: (workout: Omit<WorkoutData, "id">) => void;
}

const WORKOUT_TYPES = [
  "Strength Training",
  "Cardio",
  "Yoga",
  "HIIT",
  "Pilates",
  "Cycling",
  "Running",
  "Swimming",
  "CrossFit",
  "Other",
];

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSave }) => {
  const { toast } = useToast();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState(WORKOUT_TYPES[0]);
  const [duration, setDuration] = useState(30);
  const [exercises, setExercises] = useState<Exercise[]>([{ 
    name: "",
    sets: 3,
    reps: 10,
    weight: undefined
  }]);

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { name: "", sets: 3, reps: 10, weight: undefined }
    ]);
  };

  const handleRemoveExercise = (index: number) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const handleExerciseChange = (index: number, field: keyof Exercise, value: string | number) => {
    const newExercises = [...exercises];
    newExercises[index] = { 
      ...newExercises[index], 
      [field]: field === 'name' ? value : Number(value)
    };
    setExercises(newExercises);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!date || !type || duration <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (exercises.length === 0 || exercises.some(e => !e.name || e.sets <= 0 || e.reps <= 0)) {
      toast({
        title: "Error",
        description: "Please complete all exercise details",
        variant: "destructive",
      });
      return;
    }

    const workout = {
      date,
      type,
      duration,
      exercises
    };

    onSave(workout);
    toast({
      title: "Success",
      description: "Workout saved successfully!",
    });

    // Reset form
    setDate(new Date().toISOString().split('T')[0]);
    setType(WORKOUT_TYPES[0]);
    setDuration(30);
    setExercises([{ name: "", sets: 3, reps: 10, weight: undefined }]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="type">Workout Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {WORKOUT_TYPES.map((workoutType) => (
                <SelectItem key={workoutType} value={workoutType}>
                  {workoutType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="mt-1"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Exercises</h3>
        </div>

        {exercises.map((exercise, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="grid gap-4 md:grid-cols-5">
                <div className="md:col-span-2">
                  <Label htmlFor={`exercise-${index}-name`}>Exercise Name</Label>
                  <Input
                    id={`exercise-${index}-name`}
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                    className="mt-1"
                    placeholder="e.g., Bench Press"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor={`exercise-${index}-sets`}>Sets</Label>
                  <Input
                    id={`exercise-${index}-sets`}
                    type="number"
                    min="1"
                    value={exercise.sets}
                    onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor={`exercise-${index}-reps`}>Reps</Label>
                  <Input
                    id={`exercise-${index}-reps`}
                    type="number"
                    min="1"
                    value={exercise.reps}
                    onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`exercise-${index}-weight`}>Weight (kg)</Label>
                    <Input
                      id={`exercise-${index}-weight`}
                      type="number"
                      min="0"
                      step="0.5"
                      value={exercise.weight || ""}
                      onChange={(e) => handleExerciseChange(index, "weight", e.target.value || undefined)}
                      className="mt-1"
                      placeholder="Optional"
                    />
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mb-1 text-gray-500 hover:text-red-500"
                    onClick={() => handleRemoveExercise(index)}
                    disabled={exercises.length === 1}
                  >
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={handleAddExercise}
          className="w-full"
        >
          Add Exercise
        </Button>
      </div>

      <Button type="submit" className="w-full bg-workout-primary hover:bg-workout-secondary">
        Save Workout
      </Button>
    </form>
  );
};

export default WorkoutForm;
