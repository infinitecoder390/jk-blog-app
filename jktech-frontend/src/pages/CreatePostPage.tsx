import { PostForm } from "../components/pages/PostForm"

export default function CreatePostPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Create Post</h1>
      <PostForm />
    </div>
  )
}

