import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Opportunities from "./pages/Opportunities";
import Profile from "./pages/Profile";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [userType, setUserType] = useState("guest");
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    const isAdminPage =
      activePage === "admin-approve-posted" ||
      activePage === "admin-approve-new-user";

    if (userType === "guest" && activePage !== "home") {
      setActivePage("home");
      return;
    }

    if (userType !== "admin" && isAdminPage) {
      setActivePage("home");
    }
  }, [userType, activePage]);

  return (
    <div className="app-shell">
      <Navbar
        userType={userType}
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="app-main container py-4">
        {activePage === "home" && <Home />}

        {activePage === "users" && userType !== "guest" && <Users />}
        {activePage === "opportunities" && userType !== "guest" && (
          <Opportunities />
        )}
        {activePage === "profile" && userType !== "guest" && <Profile />}

        {activePage === "admin-approve-posted" && userType === "admin" && (
          <AdminPanel mode="approve-posted" />
        )}
        {activePage === "admin-approve-new-user" && userType === "admin" && (
          <AdminPanel mode="approve-new-user" />
        )}
      </main>

      <Footer userType={userType} setUserType={setUserType} />
    </div>
  );
}

export default App;
