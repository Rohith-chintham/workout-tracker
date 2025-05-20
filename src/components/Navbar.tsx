
import { Link, useLocation } from "react-router-dom";
import { Activity, Calendar, DumbbellIcon } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10 md:top-0 md:bottom-auto md:h-16">
      <div className="flex justify-around items-center h-16">
        <Link 
          to="/"
          className={`flex flex-col items-center justify-center px-4 py-2 rounded-md transition-colors ${
            isActive('/') 
              ? 'text-workout-primary' 
              : 'text-gray-500 hover:text-workout-primary'
          }`}
        >
          <Activity className="h-6 w-6 mb-1" />
          <span className="text-xs md:text-sm">Dashboard</span>
        </Link>

        <Link
          to="/log"
          className={`flex flex-col items-center justify-center px-4 py-2 rounded-md transition-colors ${
            isActive('/log') 
              ? 'text-workout-primary' 
              : 'text-gray-500 hover:text-workout-primary'
          }`}
        >
          <DumbbellIcon className="h-6 w-6 mb-1" />
          <span className="text-xs md:text-sm">Log Workout</span>
        </Link>

        <Link
          to="/history"
          className={`flex flex-col items-center justify-center px-4 py-2 rounded-md transition-colors ${
            isActive('/history') 
              ? 'text-workout-primary' 
              : 'text-gray-500 hover:text-workout-primary'
          }`}
        >
          <Calendar className="h-6 w-6 mb-1" />
          <span className="text-xs md:text-sm">History</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
