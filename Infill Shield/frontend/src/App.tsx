import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import LanguageButton from "./components/LanguageButton";
import Navlink from "./components/Navlink";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import CustomOrders from "./pages/CustomOrders";

function App() {
  return (
    <div className="app">
      <Header />
      <LanguageButton />
      <HashRouter>
        <Navlink />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/custom" element={<CustomOrders />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
