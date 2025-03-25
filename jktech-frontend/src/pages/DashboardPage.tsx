import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { PostList } from "../components/pages/PostList";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Posts</h1>
        <Button asChild>
          <Link to="/posts/create">Create Post</Link>
        </Button>
      </div>
      <PostList />
    </div>
  );
}
