const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface PostAttributes {
  title: string;
  slug: string;
  content?: {
    type: string;
    children: { type: string; text: string }[];
    level?: number;
  }[];
  publishedAt: string;
  image?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    }[];
  };
  categorie?: {
    data: {
      id: number;
      attributes: {
        nom: string;
      };
    };
  };
  relatedPosts?: PostAttributes[];
}

export interface Post {
  id: number;
  attributes: PostAttributes;
}

// Fonction pour récupérer tous les articles
export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_URL}/api/posts?populate=*`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched posts:', data);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Fonction pour récupérer un article par son slug
export const fetchPostBySlug = async (slug: string): Promise<PostAttributes | null> => {
  try {
    const response = await fetch(`${API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const post = data.data[0]?.attributes || null;

    if (post && post.categorie?.data?.id) {
      const categoryId = post.categorie.data.id;
      const relatedPostsResponse = await fetch(
        `${API_URL}/api/posts?filters[categorie][id][$eq]=${categoryId}&filters[slug][$ne]=${slug}&populate=image&pagination[limit]=5`
      );
      if (!relatedPostsResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const relatedPostsData = await relatedPostsResponse.json();
      post.relatedPosts = relatedPostsData.data.map((relatedPost: any) => relatedPost.attributes);
    }

    console.log('Fetched post by slug:', post);
    return post;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
};
