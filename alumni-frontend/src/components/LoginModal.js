import { useState } from "react";

const CURRENT_USER_EMAIL_KEY = "alumni.currentUserEmail";

function LoginModal({ close }) {
  const [email, setEmail] = useState("");

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-card__header">
          <h3 className="mb-0">Login</h3>
          <p className="text-muted mb-0">Dummy modal for this project.</p>
        </div>

        <div className="modal-card__body">
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              placeholder="Password"
              type="password"
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={close}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                const trimmed = String(email ?? "").trim();
                if (trimmed) {
                  window.localStorage.setItem(CURRENT_USER_EMAIL_KEY, trimmed);
                } else {
                  window.localStorage.removeItem(CURRENT_USER_EMAIL_KEY);
                }
                close();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
