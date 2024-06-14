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
  <Route path="ifrs-2-share-based-payment" element={<Dashboard />} />,
  <Route path="ifrs-3-business-combinations" element={<Dashboard />} />,
  <Route path="ifrs-5-non-current-assets-held-for-sale-and-discontinued-operations" element={<Dashboard />} />,
  <Route path="test4" element={<Dashboard />} />,
  <Route path="profile" element={<Profile />} />,
  <Route path="/*" element={<Navigate replace to="/user/dashboard" />} />,
];

export const AdminLinks = [
  { icon: GridViewIcon, link: "/ifrs-2-share-based-payment", title: "Share based payment" },
  { icon: SendIcon, link: "/ifrs-3-business-combinations", title: "business combinations" },
  { icon: EmailIcon, link: "/ifrs-5-non-current-assets-held-for-sale-and-discontinued-operations", title: "non-current-assets-held-for-sale-and-discontinued-operations" },
  { icon: SmsIcon, link: "/test4", title: "test4" }
];
