import React from "react";
import {  ToastProvider,ToastViewport} from "@/components/ui/Toast";
import { Toaster as Sonner } from "@/components/ui/Sonner";
import { TooltipProvider } from "@/components/ui/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/product/Products";
import Categories from "./pages/categories/Categories";
import Login from "./pages/authentication/Login";
import Brands from "./pages/brands/Brands";
import Orders from "./pages/Orders/Orders";
import OrdersDetailsDiaLog from "./pages/Orders/OrderDetailsDialog";
import Users from "./pages/User/Users";
import Permissions from "./pages/Permission/Permissions";
import Reviews from "./pages/reviews/Reviews";
import Settings from "./pages/setting/Settings";
import Analytics from "./pages/Analytics/Analytics";
import PrivateRoute from "./components/PrivateRoute";
const queryClient = new QueryClient();  

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <ToastProvider>
    <ToastViewport />
      <Sonner />
      <BrowserRouter>
      <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/" element={<PrivateRoute element={<Home />} />} />
  <Route path="/products" element={<PrivateRoute element={<Products />} />} />
  <Route path="/categories" element={<PrivateRoute element={<Categories />} />} />
  <Route path="/brands" element={<PrivateRoute element={<Brands />} />} />
  <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
  <Route path="/users" element={<PrivateRoute element={<Users />} />} />
  <Route path="/permissions" element={<PrivateRoute element={<Permissions />} />} />
  <Route path="/reviews" element={<PrivateRoute element={<Reviews />} />} />
  <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
  <Route path="/analytics" element={<PrivateRoute element={<Analytics />} />} />
</Routes>

      </BrowserRouter>
      </ToastProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;