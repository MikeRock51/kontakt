import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Toast from "./providers/ToastProvider";
import SignUpPage from "./pages/SignUpPage";

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
              {/* <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/food/:id" element={<FoodDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/recipes/new" element={<CreateRecipe />} />
              <Route path="/recipes/me" element={<MyRecipes />} />
              <Route path="/yishu" element={<ChatPage />} /> */}
            </Routes>
          </div>
      </Router>
  );
}

export default App;
