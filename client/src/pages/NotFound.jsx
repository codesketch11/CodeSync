import { Link } from "react-router-dom";
const NotFound = () => (
  <main className="not-found">
    <p className="eyebrow">404</p>
    <h1>That page doesn&apos;t exist.</h1>
    <p>Let&apos;s get you back to a workspace that does.</p>
    <Link className="button button-primary" to="/">
      Go home
    </Link>
  </main>
);
export default NotFound;
