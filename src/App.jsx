import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotFoundPage from "./pages/404/NotFoundPage";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import MasterLayout from "./components/layouts/MasterLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import HomeAdminPage from "./pages/admin/home/HomeAdminPage";
import ProductAdminDetailPage from "./pages/admin/product/ProductAdminDetailPage";
import MainLayout from "./components/layouts/MainLayout";
import UserAdminPage from "./pages/admin/user/UserAdminPage";
import BrandPage from "./pages/admin/brand/BrandPage";
import CategoryPage from "./pages/admin/category/CategoryPage";
import PosPage from "./pages/admin/pos/PosPage";
import SupplierPage from "./pages/admin/supplier/SupplerPage";
import PurchasePage from "./pages/admin/purchase/PurchasePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<MasterLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route> */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeAdminPage />} />
          <Route path="product" element={<ProductAdminDetailPage />} />
          <Route path="user" element={<UserAdminPage />} />
          <Route path="brand" element={<BrandPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="pos" element={<PosPage />} />
          <Route path="supplier" element={<SupplierPage />} />
          <Route path="purchase" element={<PurchasePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        {/* <Route path="admin" element={<MainLayout />}>
          <Route path="home" element={<HomeAdminPage />} />
          <Route path="product" element={<ProductAdminDetailPage />} />
          <Route path="user" element={<UserAdminPage />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
