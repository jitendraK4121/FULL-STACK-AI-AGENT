import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-300 mb-4">
      <div className="flex-1">
        <span className="text-xl font-bold px-4">Ticket System</span>
      </div>
      <div className="flex-none">
        {user.email && (
          <div className="dropdown dropdown-end">
            <div className="px-4 flex items-center gap-2">
              <span>{user.email}</span>
              <button onClick={handleLogout} className="btn btn-sm btn-error">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;