function SignupModal({ close }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-card__header">
          <h3 className="mb-0">Signup</h3>
          <p className="text-muted mb-0">Dummy modal for this project.</p>
        </div>

        <div className="modal-card__body">
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input className="form-control" placeholder="Name" />
          </div>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input className="form-control" placeholder="Email" />
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
            <button type="button" className="btn btn-primary">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
