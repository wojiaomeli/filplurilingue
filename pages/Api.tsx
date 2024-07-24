// componenets/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/posts?populate=*`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchPostBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.data || data.data.length === 0) {
      return null; // Aucun article trouvé avec ce slug
    }
    return data.data[0].attributes;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
};

export const fetchAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/posts`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;
  }
};
