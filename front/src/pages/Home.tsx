import { useEffect, useState } from "react";
import axios from "axios";
import { UnsplashImage } from "../types";
import ImageGallery from "../components/ImageGallery";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState<number>(1); // 👈 current page

  const { token } = useAuth();

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.unsplash.com/photos", {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
        },
        params: {
          per_page: 12,
          page: page,
        },
      });
      setImages(res.data);
    } catch (err) {
      setError("Failed to fetch images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const handleToggleView = () => {
    setView((prev) => (prev === "grid" ? "list" : "grid"));
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mb-4">
        
        <h1 className="text-1xl font-bold text-gray-800 dark:text-white">📸 Explore Amazing images for your Relaxation</h1>
        <button
          onClick={handleToggleView}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Toggle View: {view === "grid" ? "List" : "Grid"}
        </button>
      </div>

      {loading && <p className="text-gray-700 dark:text-gray-300">Loading images...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <ImageGallery images={images} view={view} token={token} />

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700 dark:text-white text-sm py-2">Page {page}</span>
            <button
              onClick={handleNextPage}
              className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
