import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UnsplashImage } from "../types";

interface Props {
  image: UnsplashImage;
  token: string | null;
}

const ImageCard = ({ image }: Props) => {
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [liked, setLiked] = useState(false); // local toggle

  useEffect(() => {
    // Fetch like count
    fetch(`http://localhost:5000/api/likes/${image.id}`)
      .then((res) => res.json())
      .then((data) => {
        setLikeCount(data.count || 0);
      });

    // Fetch comment count
    fetch(`http://localhost:5000/api/comments/${image.id}`)
      .then((res) => res.json())
      .then((comments) => setCommentCount(comments.length));
  }, [image.id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await fetch(`http://localhost:5000/api/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId: image.id }),
      });

      if (res.ok) {
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Failed to like image", err);
    }
  };

  const goToImage = () => {
    navigate(`/photo/${image.id}`);
  };

  return (
    <div
      onClick={goToImage}
      className="relative group overflow-hidden shadow rounded-lg cursor-pointer bg-white dark:bg-gray-800"
    >
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className="w-full h-60 object-cover"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white p-3 flex justify-between items-start">
        <span>{image.user.name}</span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className={`hover:text-red-500 ${liked ? "text-red-500" : ""}`}
          >
            ❤️ {likeCount}
          </button>
          <span>💬 {commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
