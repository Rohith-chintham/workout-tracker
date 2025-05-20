
import { useEffect, useState } from "react";
import WorkoutHistory from "@/components/WorkoutHistory";
import Navbar from "@/components/Navbar";
import { WorkoutData } from "@/components/WorkoutCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const History = () => {
  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState<WorkoutData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    // Load workouts from localStorage
    const savedWorkouts = localStorage.getItem("workouts");
    if (savedWorkouts) {
      const parsedWorkouts = JSON.parse(savedWorkouts);
      setWorkouts(parsedWorkouts);
      setFilteredWorkouts(parsedWorkouts);
    }
  }, []);

  useEffect(() => {
    // Filter workouts based on search term and type
    let result = [...workouts];

    if (searchTerm) {
      result = result.filter(
        (workout) => 
          workout.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workout.exercises.some(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterType) {
      result = result.filter((workout) => workout.type === filterType);
    }

    // Sort by date (most recent first)
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setFilteredWorkouts(result);
  }, [searchTerm, filterType, workouts]);

  // Get unique workout types for filter
  const workoutTypes = Array.from(new Set(workouts.map((w) => w.type)));

  return (
    <div className="min-h-screen bg-gray-50 pt-4 pb-20 md:pb-4 md:pt-20">
      <div className="container px-4 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-workout-primary text-center md:text-left">
            Workout History
          </h1>
          <p className="text-gray-600 text-center md:text-left mt-1">
            Review your past workouts
          </p>
        </header>

        <div className="mb-6 space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search exercises or workout types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="type-filter">Filter by Type</Label>
            <Select
              value={filterType}
              onValueChange={setFilterType}
            >
              <SelectTrigger id="type-filter" className="mt-1">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {workoutTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <WorkoutHistory workouts={filteredWorkouts} />

        {filteredWorkouts.length === 0 && searchTerm && (
          <div className="bg-workout-light/50 rounded-lg p-6 text-center mt-4">
            <h3 className="text-lg font-medium text-gray-600">No matching workouts found</h3>
            <p className="text-muted-foreground mt-1">Try a different search term</p>
          </div>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default History;
