const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PostAttributes {
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
  image?: {
    data?: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    }[];
  };
}

interface Post {
  id: number;
  attributes: PostAttributes;
}

interface ApiResponse<T> {
  data: T[];
}

// Fonction pour récupérer les posts filtrés par catégorie
export const fetchPostsByCategory = async (category: string): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_URL}/api/posts?filters[categorie][nom][$eq]=${category}&populate=*`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data: ApiResponse<Post> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    throw error;
  }
};
