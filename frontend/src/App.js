import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Toast from "./providers/ToastProvider";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ContactsPage from "./pages/ContactsPage";

function App() {
  return (
      <Router>
        <div className="App h-screen">
            {/* <header className="fixed left-0 right-0 top-0 z-20">
              <NavBar />
            </header> */}
            <Toast />
            <Routes>
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              {/* <Route path="/" element={<LandingPage />} />
              <Route path="/food/:id" element={<FoodDetails />} />
              <Route path="/recipes/new" element={<CreateRecipe />} />
              <Route path="/recipes/me" element={<MyRecipes />} />
              <Route path="/yishu" element={<ChatPage />} /> */}
            </Routes>
          </div>
      </Router>
  );
}

export default App;
