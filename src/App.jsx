import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>

      <div className="d-flex flex-column min-vh-100">

  

        {/* ROUTES */}
        <main className="flex-grow-1">
          <AppRoutes />
        </main>

        

      </div>

    </BrowserRouter>
  );
}

export default App;