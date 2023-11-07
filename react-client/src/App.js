import Dashboard from "./component/dashboard";
import HomePage from "./component/homePage";
import LoginPage from "./component/loginPage";
import NotFound from "./component/notFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage title={"HOME PAGE"} />} />
          <Route
            path="/login"
            element={
              <LoginPage title={"LOGIN PAGE"} description={"ABSENSI APP"} />
            }
          />
          <Route path="*" element={<NotFound title={"PAGE NOT FOUND"} />} />
          <Route
            path="/dashboard"
            element={<Dashboard title={"DASHBOARD"} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
