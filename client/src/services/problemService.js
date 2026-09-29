const API_URL = "http://localhost:5000/api";

const getProblemBySlug = async (slug, token) => {
    const response = await fetch(
        `${API_URL}/problems/${slug}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch problem"
        );
    }

    return data;
};

export {
    getProblemBySlug,
};