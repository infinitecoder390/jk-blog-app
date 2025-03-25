"use client";

import { useParams } from "react-router-dom";
import { PostDetail } from "../components/pages/PostDetail";

export default function PostDetailPage() {
  const { id } = useParams();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PostDetail id={id || ""} />
    </div>
  );
}
