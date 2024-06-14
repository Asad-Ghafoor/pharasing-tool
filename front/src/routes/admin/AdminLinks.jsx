import React, { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import GridViewIcon from '@mui/icons-material/GridView';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';

//  Lazy Imports
const Dashboard = lazy(() => import("../../modules/admin/dashboard/pages/Dashboard"));
const Profile = lazy(() => import("../../modules/admin/profile/pages/Profile"));


export const AdminRoutes = [
  <Route path="add-new-chat" element={<Dashboard />} />,
  <Route path="profile" element={<Profile />} />,
  <Route path="/*" element={<Navigate replace to="/user/dashboard" />} />,
];

export const AdminLinks = [
  { icon: GridViewIcon, link: "/add-new-chat", title: "New Chat" }
];
