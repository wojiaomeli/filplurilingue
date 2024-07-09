// utils/api.js
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const fetchPosts = async () => {
  try {
    const response = await fetch(`${backendUrl}/api/posts?populate=*`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

export { fetchPosts };
