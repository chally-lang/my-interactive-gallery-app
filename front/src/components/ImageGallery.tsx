import { UnsplashImage } from "../types";
import ImageCard from "./ImageCard";

interface Props {
  images: UnsplashImage[];
  view: "grid" | "list";
  token: string | null;
}

const ImageGallery = ({ images, view, token }: Props) => {
  return (
    <div
      className={`grid ${
        view === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "grid-cols-1 gap-6"
      }`}
    >
      {images.map((image) => (
        <ImageCard key={image.id} image={image} token={token} />
      ))}
    </div>
  );
};

export default ImageGallery;
