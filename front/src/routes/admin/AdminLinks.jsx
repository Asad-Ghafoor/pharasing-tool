import React, { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import GridViewIcon from '@mui/icons-material/GridView';

//  Lazy Imports
const Dashboard = lazy(() => import("../../modules/admin/dashboard/pages/Dashboard"));
const Profile = lazy(() => import("../../modules/admin/profile/pages/Profile"));
const Result = lazy(() => import("../../modules/admin/employeeManagement/pages/employeeManagement"));


export const AdminRoutes = [
  <Route path="add-new-chat" element={<Dashboard />} />,
  <Route path="profile" element={<Profile />} />,
  <Route path="result" element={<Result />} />,
  <Route path="/*" element={<Navigate replace to="/user/add-new-chat" />} />,
];

export const AdminLinks = [
  { icon: GridViewIcon, link: "/add-new-chat", title: "New Chat" }
];
