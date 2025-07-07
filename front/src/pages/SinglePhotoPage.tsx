import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UnsplashImage, Comment } from "../types";

const SinglePhotoPage = () => {
  const { id } = useParams();

  const [image, setImage] = useState<UnsplashImage | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Unsplash image
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`https://api.unsplash.com/photos/${id}`, {
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
          },
        });
        const data = await res.json();
        setImage(data);
      } catch (err) {
        setError("Failed to load image.");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${id}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Error loading comments");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // Submit new comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newComment,
          username: "Anonymous", // public comment
        }),
      });

      if (res.ok) {
        setNewComment("");
        fetchComments();
      } else {
        console.error("Failed to post comment");
      }
    } catch (err) {
      console.error("Failed to post comment");
    }
  };

  if (loading) return <div className="p-8 text-gray-600 dark:text-gray-300">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="max-w-2xl mx-auto">
        {image && (
          <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className="w-full max-h-80 object-cover rounded mb-4"
            />
            <h1 className="text-xl font-bold mb-2">
              {image.description || image.alt_description || "Untitled"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              By: {image.user.name}
            </p>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border rounded text-black"
                placeholder="Write a comment..."
                rows={3}
              />
              <button
                type="submit"
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Post Comment
              </button>
            </form>

            {/* Comment List */}
            <div>
              <h3 className="text-lg font-semibold mb-2">💬 Comments</h3>
              {comments.length === 0 ? (
                <p className="text-sm text-gray-400">No comments yet.</p>
              ) : (
                <ul className="space-y-3">
                  {comments.map((comment) => (
                    <li
                      key={comment.id}
                      className="border-b border-gray-300 dark:border-gray-700 pb-2"
                    >
                      <p className="font-medium text-blue-600 dark:text-blue-400">
                        {comment.username || "Anonymous"}
                      </p>
                      <p className="text-sm">{comment.text}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePhotoPage;
