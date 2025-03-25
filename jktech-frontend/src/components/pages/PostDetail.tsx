"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import apiClient from "@/lib/apiClient";

// Define types for Post and Author
interface Author {
  id: string;
  username: string;
}

interface Post {
  id: string;
  title: string;
  body: string;
  user: Author;
  createdAt: string;
}

interface PostDetailProps {
  id: string;
}

export function PostDetail({ id }: PostDetailProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching post
    setTimeout(async () => {
      const { data } = await apiClient.get(`/posts/${id}`);
      setPost(data);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return formattedDate;
  };

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader className="space-y-2">
          <div className="h-7 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/3"></div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </CardContent>
      </Card>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">Post not found</h3>
        <p className="text-muted-foreground mb-4">
          The post you're looking for doesn't exist or has been removed
        </p>
        <Button asChild>
          <Link to="/posts">Back to Posts</Link>
        </Button>
      </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{post.title}</CardTitle>
        <div className="text-sm text-muted-foreground">
          By {post.user.username} • {formatDate(post.createdAt)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none dark:prose-invert">
          {post.body.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline">
          <Link to="/posts">Back to Posts</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
