/// <reference types="vite/client" />

// 🌍 Vite environment variables
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_UNSPLASH_ACCESS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


// Image type from Unsplash API
export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
    thumb: string;
  };
  alt_description: string;
  description: string | null;
  user: {
    name: string;
    username: string;
    profile_image: {
      small: string;
    };
  };
}

// Authenticated user type
export interface User {
  id: string;
  name?: string;
  email: string;
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Comment on an image
export interface Comment {
  id: string;
  userId: string;
  imageId: string;
  text: string;
  username: string; 
  createdAt: string;
  user?: User;
}

// Like on an image
export interface Like {
  id: string;
  userId: string;
  imageId: string;
  createdAt: string;
}

// Optional API error type
export interface ApiError {
  message: string;
  statusCode?: number;
}
