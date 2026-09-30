const API_URL = "http://localhost:5000/api";

export const getProblems = async (token, difficulty = "") => {
  const query = difficulty ? `?difficulty=${difficulty}` : "";
  const response = await fetch(`${API_URL}/problems${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch problems");
  return data;
};

const getProblemBySlug = async (slug, token) => {
  const response = await fetch(`${API_URL}/problems/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch problem");
  }

  return data;
};

export { getProblemBySlug };
