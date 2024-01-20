import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Toast from "./providers/ToastProvider";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ContactsPage from "./pages/ContactsPage";
import ContactCard from "./components/ContactCard";
import SideNav from "./components/SideNav";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="App h-screen flex justify-center">
        {/* <header className="fixed left-0 right-0 top-0 z-20">
              <NavBar />
            </header> */}
        <SideNav />
        <div className="flex-grow flex flex-col justify-center items-center">
          <Toast />
          <Routes className="flex-grow">
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/contacts/:id" element={<ContactCard />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
