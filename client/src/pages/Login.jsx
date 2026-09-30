import { useState } from "react";
import { ArrowRight, Code2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-page">
      <Link className="brand auth-brand" to="/">
        <span className="brand-mark">
          <Code2 size={19} />
        </span>
        CodeSync
      </Link>
      <section className="auth-card">
        <div className="auth-heading">
          <p className="eyebrow">Welcome back</p>
          <h1>Sign in to your workspace</h1>
          <p>Pick up where your team left off.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button
            className="button button-primary button-full"
            disabled={loading}
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                Sign in <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>
        <p className="auth-switch">
          New to CodeSync? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </div>
  );
};
export default Login;
