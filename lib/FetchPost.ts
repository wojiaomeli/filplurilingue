// lib/fetchPosts.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface PostAttributes {
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

export interface Post {
  id: number;
  attributes: PostAttributes;
}

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_URL}/api/posts?populate=*`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchPostBySlug = async (slug: string): Promise<PostAttributes | null> => {
  try {
    const response = await fetch(`${API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Post data by slug:', data);
    return data.data[0]?.attributes || null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
};

export const fetchAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_URL}/api/posts?populate=*`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('All posts data:', data);
    return data.data;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;
  }
};
