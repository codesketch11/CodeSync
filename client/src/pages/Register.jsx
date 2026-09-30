import { useState } from "react";
import { ArrowRight, Code2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/login");
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
          <p className="eyebrow">Start collaborating</p>
          <h1>Create your workspace</h1>
          <p>It takes less than a minute to get started.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ada Lovelace"
              required
            />
          </label>
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
              placeholder="At least 6 characters"
              minLength="6"
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button
            className="button button-primary button-full"
            disabled={loading}
          >
            {loading ? (
              "Creating account..."
            ) : (
              <>
                Create account <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </div>
  );
};
export default Register;
