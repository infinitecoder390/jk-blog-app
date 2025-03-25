import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

// Define the types for the post and author data
interface Author {
  name: string;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: Author;
  createdAt: string;
}

export function AllPostsList() {
  // Set the state type for posts and loading status
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching posts
    setTimeout(() => {
      // Mock data
      const mockPosts: Post[] = [
        {
          id: "1",
          title: "Getting Started with React",
          excerpt: "Learn how to build modern web applications with React",
          author: { name: "Demo User" },
          createdAt: "2023-06-15T10:00:00Z",
        },
        {
          id: "2",
          title: "The Power of Tailwind CSS",
          excerpt:
            "Discover how Tailwind CSS can speed up your development workflow",
          author: { name: "Demo User" },
          createdAt: "2023-06-10T14:30:00Z",
        },
        {
          id: "3",
          title: "Authentication Best Practices",
          excerpt:
            "Learn the best practices for implementing authentication in your web apps",
          author: { name: "Demo User" },
          createdAt: "2023-06-05T09:15:00Z",
        },
        {
          id: "4",
          title: "Building Responsive UIs",
          excerpt: "Tips and tricks for building responsive user interfaces",
          author: { name: "Another User" },
          createdAt: "2023-06-01T11:20:00Z",
        },
        {
          id: "5",
          title: "State Management in React",
          excerpt:
            "Different approaches to state management in React applications",
          author: { name: "Another User" },
          createdAt: "2023-05-28T16:45:00Z",
        },
      ];
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-5 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle className="line-clamp-1">{post.title}</CardTitle>
            <CardDescription>
              By {post.author.name} • {formatDate(post.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" size="sm">
              <Link to={`/posts/${post.id}`}>Read More</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
