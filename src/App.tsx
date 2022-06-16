import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Animals from "./components/pages/Animals";
import Animal from "./components/pages/Animal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Animals />} />
          <Route path="/animal/:id" element={<Animal />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
