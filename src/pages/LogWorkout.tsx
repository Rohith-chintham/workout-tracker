
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutForm from "@/components/WorkoutForm";
import Navbar from "@/components/Navbar";
import { WorkoutData } from "@/components/WorkoutCard";
import { v4 as uuidv4 } from "uuid";

const LogWorkout = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);

  useEffect(() => {
    // Load existing workouts
    const savedWorkouts = localStorage.getItem("workouts");
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  const handleSaveWorkout = (workoutData: Omit<WorkoutData, "id">) => {
    const newWorkout: WorkoutData = {
      ...workoutData,
      id: uuidv4(),
    };

    const updatedWorkouts = [newWorkout, ...workouts];
    setWorkouts(updatedWorkouts);
    localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));

    // Navigate back to dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-20 md:pb-4 md:pt-20">
      <div className="container px-4 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-workout-primary text-center md:text-left">
            Log Workout
          </h1>
          <p className="text-gray-600 text-center md:text-left mt-1">
            Record your workout details
          </p>
        </header>

        <WorkoutForm onSave={handleSaveWorkout} />
      </div>
      <Navbar />
    </div>
  );
};

export default LogWorkout;
