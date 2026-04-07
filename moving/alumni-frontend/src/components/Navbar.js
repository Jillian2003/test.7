import { useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

function Navbar({ userType, activePage, onNavigate }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const canSeeAuthedPages = userType !== "guest";
  const isAdmin = userType === "admin";

  function navButton(page, label) {
    const isActive = activePage === page;
    return (
      <button
        type="button"
        className={`nav-link btn btn-link px-2 ${isActive ? "active" : ""}`}
        onClick={() => {
          setAdminMenuOpen(false);
          onNavigate(page);
        }}
      >
        {label}
      </button>
    );
  }

  return (
    <header className="app-header sticky-top">
      <nav className="navbar navbar-expand bg-body-tertiary border-bottom">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="navbar-brand btn btn-link p-0"
              onClick={() => {
                setAdminMenuOpen(false);
                onNavigate("home");
              }}
            >
              Alumni App
            </button>

            <div className="navbar-nav flex-row gap-1">
              {navButton("home", "Home")}

              {canSeeAuthedPages && navButton("users", "Users")}
              {canSeeAuthedPages &&
                navButton("opportunities", "Opportunities")}
              {canSeeAuthedPages && navButton("profile", "Profile")}

              {isAdmin && (
                <div className="nav-item dropdown">
                  <button
                    type="button"
                    className={`nav-link btn btn-link dropdown-toggle px-2 ${
                      activePage.startsWith("admin-") ? "active" : ""
                    }`}
                    onClick={() => setAdminMenuOpen(open => !open)}
                    aria-expanded={adminMenuOpen}
                  >
                    Admin Panel
                  </button>

                  {adminMenuOpen && (
                    <div className="dropdown-menu show">
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => {
                          setAdminMenuOpen(false);
                          onNavigate("admin-approve-posted");
                        }}
                      >
                        Approve Posted
                      </button>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={() => {
                          setAdminMenuOpen(false);
                          onNavigate("admin-approve-new-user");
                        }}
                      >
                        Approve New User
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {userType === "guest" && (
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setShowSignup(true)}
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </nav>

      {showLogin && <LoginModal close={() => setShowLogin(false)} />}
      {showSignup && <SignupModal close={() => setShowSignup(false)} />}
    </header>
  );
}

export default Navbar;
