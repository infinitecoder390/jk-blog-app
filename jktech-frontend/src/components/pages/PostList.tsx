"use client";

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
import apiClient from "@/lib/apiClient";

interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}
export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]); // Type posts as an array of Post objects
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchPosts() {
      const mockPosts: { data: Post[] } = await apiClient.get("/posts");
      setPosts(mockPosts.data);
      setIsLoading(false);
    }
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
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

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No posts yet</h3>
        <p className="text-muted-foreground mb-4">
          Create your first post to get started
        </p>
        <Button asChild>
          <Link to="/posts/create">Create Post</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const date = new Date(post.createdAt);
        const formattedDate = date.toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="line-clamp-1">{post.title}</CardTitle>
              <CardDescription>{formattedDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-muted-foreground">{post.body}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm">
                <Link to={`/posts/${post.id}`}>View Post</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
