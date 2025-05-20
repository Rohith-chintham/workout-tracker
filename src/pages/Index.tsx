
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import WorkoutStats from "@/components/WorkoutStats";
import WorkoutHistory from "@/components/WorkoutHistory";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { DumbbellIcon } from "lucide-react";
import { WorkoutData } from "@/components/WorkoutCard";

// Sample workout data
const sampleWorkouts: WorkoutData[] = [
  {
    id: "1",
    date: "2025-05-18",
    type: "Strength Training",
    duration: 60,
    exercises: [
      { name: "Bench Press", sets: 4, reps: 8, weight: 70 },
      { name: "Barbell Row", sets: 3, reps: 10, weight: 60 },
      { name: "Squats", sets: 4, reps: 8, weight: 100 },
    ],
  },
  {
    id: "2",
    date: "2025-05-15",
    type: "Cardio",
    duration: 45,
    exercises: [
      { name: "Treadmill", sets: 1, reps: 1 },
      { name: "Stationary Bike", sets: 1, reps: 1 },
    ],
  },
];

const Index = () => {
  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);

  useEffect(() => {
    // In a real app, you'd fetch from an API or localStorage
    const savedWorkouts = localStorage.getItem("workouts");
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    } else {
      // Use sample data for demo
      setWorkouts(sampleWorkouts);
      localStorage.setItem("workouts", JSON.stringify(sampleWorkouts));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-20 md:pb-4 md:pt-20">
      <div className="container px-4 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-workout-primary text-center md:text-left">
            Workout Tracker
          </h1>
          <p className="text-gray-600 text-center md:text-left mt-1">
            Track your fitness journey
          </p>
        </header>

        <section className="mb-8">
          <WorkoutStats workouts={workouts} />
        </section>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Workouts</h2>
            <Link to="/history">
              <Button variant="link" className="text-workout-primary p-0">
                View All
              </Button>
            </Link>
          </div>
          <WorkoutHistory workouts={workouts} limit={3} />
        </section>

        <div className="flex justify-center md:justify-start">
          <Link to="/log">
            <Button className="bg-workout-primary hover:bg-workout-secondary">
              <DumbbellIcon className="mr-2 h-4 w-4" />
              Log New Workout
            </Button>
          </Link>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Index;
