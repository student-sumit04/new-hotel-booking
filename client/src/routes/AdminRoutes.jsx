import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/DashBoard";
import CreatePost from "../pages/Admin/CreatePost";
// ...other imports...

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/create-post" element={<CreatePost />} />
      {/* Add other admin routes here */}
    </Routes>
  );
};

export default AdminRoutes;