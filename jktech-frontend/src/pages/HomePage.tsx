import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Welcome to the Blog App
        </h1>
        <p className="text-lg max-w-[600px] mx-auto">
          Share your thoughts and ideas with the world. Create an account to
          start posting.
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link
            to="/login"
            className="transition-transform transform hover:scale-105"
          >
            Get Started
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            to="/posts"
            className="transition-transform transform hover:scale-105"
          >
            Browse Posts
          </Link>
        </Button>
      </div>
    </div>
  );
}
