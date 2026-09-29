const API_URL = "http://localhost:5000/api";

export const getRoom = async (roomCode, token) => {
    const response = await fetch(
        `${API_URL}/rooms/${roomCode}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch room");
    }

    return data;
};


export const createRoom = async (name, token) => {
    const response = await fetch(
        `${API_URL}/rooms`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create room");
    }

    return data;
};


export const joinRoom = async (roomCode, token) => {
    const response = await fetch(
        `${API_URL}/rooms/join`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                roomCode,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to join room");
    }

    return data;
};


export const leaveRoom = async (roomCode, token) => {
    const response = await fetch(
        `${API_URL}/rooms/${roomCode}/leave`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to leave room");
    }

    return data;
};


export const assignProblem = async (
    roomCode,
    problemId,
    token
) => {
    const response = await fetch(
        `${API_URL}/rooms/${roomCode}/problem`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                problemId,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to assign problem"
        );
    }

    return data;
};