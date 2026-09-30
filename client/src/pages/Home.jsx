import {
  ArrowRight,
  Code2,
  GitBranch,
  Radio,
  UsersRound,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="landing-page">
    <header className="landing-nav">
      <Link className="brand" to="/">
        <span className="brand-mark">
          <Code2 size={19} />
        </span>
        CodeSync
      </Link>
      <div>
        <Link className="text-link" to="/login">
          Sign in
        </Link>
        <Link className="button button-primary" to="/register">
          Get started <ArrowRight size={16} />
        </Link>
      </div>
    </header>
    <main>
      <section className="hero">
        <div className="eyebrow">
          <Radio size={15} /> Built for real-time collaboration
        </div>
        <h1>
          Think together.
          <br />
          <span>Ship smarter.</span>
        </h1>
        <p>
          CodeSync is a focused collaborative workspace for solving coding
          challenges, sharing ideas, and building solutions in real time.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary button-large" to="/register">
            Start coding together <ArrowRight size={18} />
          </Link>
          <Link className="button button-secondary button-large" to="/login">
            I have an account
          </Link>
        </div>
        <div className="hero-code">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <pre>
            <span className="code-purple">const</span> solveTogether ={" "}
            <span className="code-blue">async</span> (team) =&gt; {"{"}
            {`\n`} <span className="code-purple">await</span>{" "}
            team.collaborate();{`\n`}{" "}
            <span className="code-purple">return</span>{" "}
            <span className="code-green">"accepted"</span>;{`\n`}
            {"}"};
          </pre>
          <div className="collab-cursor">
            A <span>Alex is editing</span>
          </div>
        </div>
      </section>
      <section className="feature-grid">
        <article>
          <span className="feature-icon violet">
            <Zap />
          </span>
          <h2>Live code sync</h2>
          <p>
            Every edit is shared with your room instantly, so ideas move at the
            speed of thought.
          </p>
        </article>
        <article>
          <span className="feature-icon blue">
            <UsersRound />
          </span>
          <h2>Focused rooms</h2>
          <p>
            Create a private room, invite your team with a short code, and stay
            on the same page.
          </p>
        </article>
        <article>
          <span className="feature-icon orange">
            <GitBranch />
          </span>
          <h2>Curated challenges</h2>
          <p>
            Practice on an approachable library of classic interview problems
            together.
          </p>
        </article>
      </section>
    </main>
  </div>
);
export default Home;
