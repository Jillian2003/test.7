function AdminPanel({ mode }) {
  const isApprovePosted = mode === "approve-posted";
  const title = isApprovePosted ? "Approve Posted" : "Approve New User";

  const dummyOpportunities = [
    {
      id: "op-1",
      title: "Campus Guest Speaker (Marketing)",
      postedBy: "jane.alum",
      type: "event"
    },
    {
      id: "op-2",
      title: "Software Internship - Summer",
      postedBy: "tech.alumni",
      type: "internship"
    },
    {
      id: "op-3",
      title: "Paid Part-Time Research Assistant",
      postedBy: "dr.smith",
      type: "job"
    }
  ];

  const dummyUsers = [
    {
      id: "user-1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      yearGraduated: 2022
    },
    {
      id: "user-2",
      name: "Sam Lee",
      email: "sam.lee@example.com",
      yearGraduated: 2019
    },
    {
      id: "user-3",
      name: "Taylor Nguyen",
      email: "taylor.nguyen@example.com",
      yearGraduated: 2015
    }
  ];

  return (
    <section className="content-card">
      <div className="d-flex align-items-baseline justify-content-between flex-wrap gap-2">
        <h2 className="mb-0">Admin Panel</h2>
        <span className="text-muted">{title}</span>
      </div>

      <hr />

      {isApprovePosted ? (
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Posted By</th>
              </tr>
            </thead>
            <tbody>
              {dummyOpportunities.map(op => (
                <tr key={op.id}>
                  <td className="fw-semibold">{op.title}</td>
                  <td className="text-capitalize">{op.type}</td>
                  <td>{op.postedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Year Graduated</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map(u => (
                <tr key={u.id}>
                  <td className="fw-semibold">{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.yearGraduated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminPanel;
