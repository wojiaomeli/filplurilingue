const API_URL = process.env.NEXT_PUBLIC_API_URL; // Assurez-vous que cette variable est bien définie dans .env.local

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/posts?populate=*`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};