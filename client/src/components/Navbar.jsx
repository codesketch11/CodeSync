import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav>
            <div>
                <h2>CodeSync</h2>
            </div>

            <div>
                {user && (
                    <span>
                        {user.name}
                    </span>
                )}

                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;