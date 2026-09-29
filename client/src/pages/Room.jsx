import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

import { getRoom } from "../services/roomService";
import { getProblemBySlug } from "../services/problemService";
import CodeEditor from "../components/CodeEditor";
import socket from "../services/socket";

const Room = () => {
    const { roomCode } = useParams();

    const { token, user } = useAuth();

    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [problem, setProblem] = useState(null);

    const [language, setLanguage] = useState("cpp");
    const [code, setCode] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [roomLoaded, setRoomLoaded] = useState(false);

    const codeRef = useRef("");

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getRoom(
                    roomCode,
                    token
                );

                setRoom(data.room);
                setParticipants(data.participants);

                setCode(data.room.code || "");
                codeRef.current = data.room.code || "";

                setLanguage(data.room.language || "cpp");

                if (data.room.problem) {
                    const problemData = await getProblemBySlug(
                        data.room.problem.slug,
                        token
                    );

                    setProblem(problemData.problem);
                }

                setRoomLoaded(true);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (token && roomCode) {
            fetchRoom();
        }
    }, [roomCode, token]);

    useEffect(() => {
        if (!roomLoaded || !roomCode) {
            return;
        }

        console.log("Connecting to Socket.IO...");

        const joinRoom = () => {
            console.log(
                "Connected to Socket.IO:",
                socket.id
            );

            socket.emit("join-room", {
                roomCode,
            });
        };

        const handleRoomState = ({ code, language }) => {
            console.log(
                "Received current room code:",
                code
            );

            codeRef.current = code;
            setCode(code);

            if (language) {
                setLanguage(language);
            }
        };

        const handleCodeUpdate = ({ code }) => {
            console.log(
                "Received code update:",
                code
            );

            codeRef.current = code;
            setCode(code);
        };

        const handleLanguageUpdate = ({ language, code }) => {
            console.log(
                "Received language update:",
                language
            );

            setLanguage(language);
            setCode(code);
            codeRef.current = code;
        };

        socket.on("connect", joinRoom);

        socket.on("connect_error", (error) => {
            console.error(
                "Socket connection error:",
                error.message
            );
        });

        socket.on("room-state", handleRoomState);
        socket.on("code-update", handleCodeUpdate);
        socket.on("language-update", handleLanguageUpdate);

        if (socket.connected) {
            joinRoom();
        }

        return () => {
            socket.off("connect", joinRoom);
            socket.off("room-state", handleRoomState);
            socket.off("code-update", handleCodeUpdate);
            socket.off("language-update", handleLanguageUpdate);
        };
    }, [roomCode, roomLoaded]);

    if (loading) {
        return <p>Loading room...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!room) {
        return <p>Room not found.</p>;
    }

    return (
        <div>
            <Navbar />

            <main>
                <h1>{room.name}</h1>

                <p>
                    Room Code: {room.roomCode}
                </p>

                <p>
                    Host: {room.host.name}
                </p>

                <hr />

                <section>
                      <h2>Problem</h2>

                      {problem ? (
                          <div>
                              <h3>{problem.title}</h3>

                              <p>
                                  Difficulty: {problem.difficulty}
                              </p>

                              <h4>Description</h4>
                              <p>{problem.description}</p>

                              {problem.inputFormat && (
                                  <>
                                      <h4>Input</h4>
                                      <p>{problem.inputFormat}</p>
                                  </>
                              )}

                              {problem.outputFormat && (
                                  <>
                                      <h4>Output</h4>
                                      <p>{problem.outputFormat}</p>
                                  </>
                              )}

                              {problem.constraints && (
                                  <>
                                      <h4>Constraints</h4>
                                      <p>{problem.constraints}</p>
                                  </>
                              )}

                              {problem.examples && (
                                  <>
                                      <h4>Examples</h4>

                                      <pre>
                                          {JSON.stringify(
                                              problem.examples,
                                              null,
                                              2
                                          )}
                                      </pre>
                                  </>
                              )}
                          </div>
                      ) : room.problem ? (
                          <p>Loading problem...</p>
                      ) : (
                          <p>
                              No problem has been assigned yet.
                          </p>
                      )}
                  </section>

                      <hr />
                                  
                      <select
                        value={language}
                        onChange={(e) => {
                            const newLanguage = e.target.value;

                            const newCode =
                                problem?.starterCode?.[newLanguage] || "";

                            setLanguage(newLanguage);
                            setCode(newCode);
                            codeRef.current = newCode;

                            socket.emit("language-change", {
                                roomCode,
                                language: newLanguage,
                                code: newCode,
                            });
                        }}
                    >
                      <option value="cpp">C++</option>
                      <option value="javascript">
                          JavaScript
                      </option>
                      <option value="python">Python</option>
                  </select>

                <section>
                    <h2>Code Editor</h2>

                    <CodeEditor
                        code={code}
                        language={language}
                        onChange={(value) => {
                            const newCode = value || "";

                            setCode(newCode);
                            codeRef.current = newCode;

                            socket.emit("code-change", {
                                roomCode,
                                code: newCode,
                            });
                        }}
                    />
                </section>

                <section>
                    <h2>
                        Participants (
                        {participants.length})
                    </h2>

                    {participants.map((participant) => (
                        <div key={participant.id}>
                            <strong>
                                {participant.name}
                            </strong>

                            <span>
                                {" "}
                                — {participant.role}
                            </span>

                            {participant.id === user?.id && (
                                <span>
                                    {" "}
                                    (You)
                                </span>
                            )}
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Room;