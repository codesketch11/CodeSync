import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getProblemBySlug } from "../services/problemService";
const ProblemDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    getProblemBySlug(id, token)
      .then((data) => setProblem(data.problem))
      .catch((err) => setError(err.message));
  }, [id, token]);
  if (error)
    return (
      <div className="app-shell">
        <Navbar />
        <main className="page">
          <p className="form-error">{error}</p>
        </main>
      </div>
    );
  if (!problem) return <div className="loading-screen">Loading challenge…</div>;
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page details-page">
        <Link className="back-link" to="/problems">
          <ArrowLeft size={16} /> All challenges
        </Link>
        <div className="problem-title">
          <div>
            <p className="eyebrow">Challenge</p>
            <h1>{problem.title}</h1>
          </div>
          <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
        </div>
        <section className="problem-content">
          <article className="problem-copy">
            <h2>
              <BookOpen size={19} /> Problem
            </h2>
            <p className="preserve-lines">{problem.description}</p>
            {problem.inputFormat && (
              <>
                <h3>Input format</h3>
                <p className="preserve-lines">{problem.inputFormat}</p>
              </>
            )}
            {problem.outputFormat && (
              <>
                <h3>Output format</h3>
                <p className="preserve-lines">{problem.outputFormat}</p>
              </>
            )}
            {problem.constraints && (
              <>
                <h3>Constraints</h3>
                <p className="constraints preserve-lines">
                  {problem.constraints}
                </p>
              </>
            )}
          </article>
          <aside>
            <h2>Examples</h2>
            {problem.examples?.map((example, index) => (
              <div className="example-card" key={index}>
                <div className="example-label">
                  <CheckCircle2 size={15} /> Example {index + 1}
                </div>
                <span>Input</span>
                <pre>{example.input}</pre>
                <span>Output</span>
                <pre>{example.output}</pre>
                {example.explanation && <p>{example.explanation}</p>}
              </div>
            ))}
          </aside>
        </section>
      </main>
    </div>
  );
};
export default ProblemDetails;
