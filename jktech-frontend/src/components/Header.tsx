import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "lucide-react";
export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-12">
        {/* Branding and Logo */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 hover:text-indigo-200"
          >
            BlogApp
          </Link>
          {/* Navigation Menu */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link
              to="/posts"
              className="text-gray-300 hover:text-indigo-300 transition-all duration-300 ease-in-out"
            >
              Browse Posts
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-indigo-300 transition-all duration-300 ease-in-out"
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>
        {/* User Authentication / Dropdown */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-gray-100 hover:bg-gray-700 transition-all duration-300 ease-in-out"
                >
                  <User className="h-5 w-5" /> {user.username}
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
              >
                <DropdownMenuItem asChild>
                  <Link
                    to="/dashboard"
                    className="text-gray-100 hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/posts/create"
                    className="text-gray-100 hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
                  >
                    Create Post
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-500 hover:bg-gray-700 transition-colors duration-300 ease-in-out"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link
                to="/login"
                className="text-gray-100 hover:text-indigo-400 transition-all duration-300 ease-in-out"
              >
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
