import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Headers from "./components/Headers";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          backgroundColor: "#14161a",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <Headers />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
