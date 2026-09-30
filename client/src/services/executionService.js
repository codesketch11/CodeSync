const API_URL = "http://localhost:5000/api";

export const executeCode = async ({ roomCode, code, language, mode, token }) => {
    const response = await fetch(`${API_URL}/rooms/${roomCode}/execute`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code, language, mode }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Code execution failed");
    return data;
};
