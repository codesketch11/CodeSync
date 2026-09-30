import { useEffect, useState } from "react";
import { ArrowRight, Clipboard, Plus, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { createRoom, getMyRooms, joinRoom } from "../services/roomService";

const Dashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getMyRooms(token)
      .then((data) => setRooms(data.rooms))
      .catch((err) => setError(err.message));
  }, [token]);
  const create = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    setLoading(true);
    setError("");
    try {
      const data = await createRoom(roomName.trim(), token);
      navigate(`/room/${data.room.roomCode}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const join = async (e) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    setLoading(true);
    setError("");
    try {
      const data = await joinRoom(roomCode.trim(), token);
      navigate(`/room/${data.room.roomCode}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page dashboard">
        <section className="page-intro">
          <div>
            <p className="eyebrow">Your workspace</p>
            <h1>Welcome back, {user?.name?.split(" ")[0]}.</h1>
            <p>
              Create a room for your next pairing session or jump into a room
              with your team.
            </p>
          </div>
        </section>
        {error && <p className="form-error">{error}</p>}
        <section className="room-actions">
          <form className="action-card" onSubmit={create}>
            <span className="action-icon purple">
              <Plus />
            </span>
            <div>
              <h2>Start a room</h2>
              <p>
                Create a fresh space and invite collaborators with a short code.
              </p>
            </div>
            <label className="sr-only" htmlFor="room-name">
              Room name
            </label>
            <input
              id="room-name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="e.g. Friday mock interview"
              maxLength="60"
            />
            <button className="button button-primary" disabled={loading}>
              Create <ArrowRight size={16} />
            </button>
          </form>
          <form className="action-card" onSubmit={join}>
            <span className="action-icon blue">
              <Clipboard />
            </span>
            <div>
              <h2>Join a room</h2>
              <p>Enter a teammate&apos;s room code to start collaborating.</p>
            </div>
            <label className="sr-only" htmlFor="room-code">
              Room code
            </label>
            <input
              id="room-code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="e.g. 7F3A9C20"
              maxLength="8"
            />
            <button className="button button-secondary" disabled={loading}>
              Join <ArrowRight size={16} />
            </button>
          </form>
        </section>
        <section className="section-heading">
          <div>
            <h2>Your rooms</h2>
            <p>Spaces you&apos;ve created or joined.</p>
          </div>
        </section>
        {rooms.length ? (
          <section className="room-grid">
            {rooms.map((room) => (
              <button
                className="room-card"
                key={room.id}
                onClick={() => navigate(`/room/${room.roomCode}`)}
              >
                <div className="room-card-top">
                  <span className="room-letter">
                    {room.name.slice(0, 1).toUpperCase()}
                  </span>
                  <ArrowRight size={18} />
                </div>
                <h3>{room.name}</h3>
                <p className="room-code">{room.roomCode}</p>
                <div className="room-card-footer">
                  <span>
                    <UsersRound size={15} /> {room.participantCount}{" "}
                    collaborator{room.participantCount === 1 ? "" : "s"}
                  </span>
                  {room.problem ? (
                    <span
                      className={`difficulty ${room.problem.difficulty.toLowerCase()}`}
                    >
                      {room.problem.difficulty}
                    </span>
                  ) : (
                    <span className="muted">No challenge</span>
                  )}
                </div>
              </button>
            ))}
          </section>
        ) : (
          <section className="empty-state">
            <UsersRound size={30} />
            <h2>No rooms yet</h2>
            <p>Start your first room above and bring someone into the flow.</p>
          </section>
        )}
      </main>
    </div>
  );
};
export default Dashboard;
