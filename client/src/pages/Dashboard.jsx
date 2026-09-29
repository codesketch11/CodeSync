import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { createRoom, joinRoom } from "../services/roomService";

const Dashboard = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [roomName, setRoomName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [roomCode, setRoomCode] = useState("");

    const handleJoinRoom = async (e) => {
        e.preventDefault();

        setError("");

        if (!roomCode.trim()) {
            setError("Room code is required");
            return;
        }

        setLoading(true);

        try {
            const data = await joinRoom(
                roomCode.trim(),
                token
            );

            navigate(`/room/${data.room.roomCode}`);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateRoom = async (e) => {
        e.preventDefault();

        setError("");

        if (!roomName.trim()) {
            setError("Room name is required");
            return;
        }

        setLoading(true);

        try {
            const data = await createRoom(
                roomName.trim(),
                token
            );

            navigate(`/room/${data.room.roomCode}`);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            <main>
                <h1>
                    Welcome back, {user?.name}!
                </h1>

                <p>
                    Create a room or join an existing room.
                </p>

                <section>
                    <h2>Create Room</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            value={roomName}
                            onChange={(e) =>
                                setRoomName(e.target.value)
                            }
                            placeholder="Enter room name"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Room"}
                        </button>
                    </form>

                    {error && <p>{error}</p>}
                </section>
                <section>
                    <h2>Join Room</h2>

                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            value={roomCode}
                            onChange={(e) =>
                                setRoomCode(e.target.value)
                            }
                            placeholder="Enter room code"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Joining..." : "Join Room"}
                        </button>
                    </form>

                    {error && <p>{error}</p>}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;