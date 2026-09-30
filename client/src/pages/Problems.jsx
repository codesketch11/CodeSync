import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getProblems } from "../services/problemService";

const Problems = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [error, setError] = useState("");
  useEffect(() => {
    getProblems(token)
      .then((data) => setProblems(data.problems))
      .catch((err) => setError(err.message));
  }, [token]);
  const visible = useMemo(
    () =>
      problems.filter(
        (problem) =>
          (filter === "ALL" || problem.difficulty === filter) &&
          problem.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [problems, filter, search],
  );
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page">
        <section className="page-intro">
          <p className="eyebrow">Challenge library</p>
          <h1>Sharpen your skills, together.</h1>
          <p>
            Choose a classic challenge, understand the problem, then take it to
            your room to solve collaboratively.
          </p>
        </section>
        <section className="problem-toolbar">
          <div className="search-input">
            <Search size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search challenges"
            />
          </div>
          <div className="filters">
            {["ALL", "EASY", "MEDIUM", "HARD"].map((value) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={filter === value ? "active" : ""}
              >
                {value === "ALL"
                  ? "All"
                  : value[0] + value.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </section>
        {error ? (
          <p className="form-error">{error}</p>
        ) : (
          <section className="problem-list">
            {visible.map((problem, index) => (
              <button
                key={problem.id}
                className="problem-row"
                onClick={() => navigate(`/problems/${problem.slug}`)}
              >
                <span className="problem-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2>{problem.title}</h2>
                  <p>Open challenge details and examples</p>
                </div>
                <span
                  className={`difficulty ${problem.difficulty.toLowerCase()}`}
                >
                  {problem.difficulty}
                </span>
                <ArrowRight className="row-arrow" size={18} />
              </button>
            ))}
            {!visible.length && (
              <div className="empty-state">
                <Search size={28} />
                <h2>No matching challenges</h2>
                <p>Try a different keyword or difficulty.</p>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};
export default Problems;
