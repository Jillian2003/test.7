import { useState } from "react";

const CURRENT_USER_EMAIL_KEY = "alumni.currentUserEmail";
const DEFAULT_USER_EMAIL = "jilly.jam@example.com";

function Footer({ userType, setUserType }) {
  const [open, setOpen] = useState(false);

  const currentLabel =
    userType === "guest" ? "Not logged in" : userType === "admin" ? "Admin" : "User";

  return (
    <footer className="app-footer border-top">
      <div className="container d-flex align-items-center justify-content-center py-2">
        <div className="role-switch">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary role-switch__button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
          >
            Role: {currentLabel}
          </button>

          {open && (
            <div className="role-switch__menu" role="menu">
              <button
                type="button"
                className="role-switch__item"
                onClick={() => {
                  window.localStorage.removeItem(CURRENT_USER_EMAIL_KEY);
                  setUserType("guest");
                  setOpen(false);
                }}
              >
                Not logged in
              </button>
              <button
                type="button"
                className="role-switch__item"
                onClick={() => {
                  window.localStorage.setItem(
                    CURRENT_USER_EMAIL_KEY,
                    DEFAULT_USER_EMAIL
                  );
                  setUserType("user");
                  setOpen(false);
                }}
              >
                User logged in
              </button>
              <button
                type="button"
                className="role-switch__item"
                onClick={() => {
                  window.localStorage.removeItem(CURRENT_USER_EMAIL_KEY);
                  setUserType("admin");
                  setOpen(false);
                }}
              >
                Admin logged in
              </button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
