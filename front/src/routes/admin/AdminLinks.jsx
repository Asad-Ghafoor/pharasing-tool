import React, { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import GridViewIcon from '@mui/icons-material/GridView';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';

//  Lazy Imports
const Dashboard = lazy(() => import("../../modules/admin/dashboard/pages/Dashboard"));
const SentOfferLog = lazy(() => import("../../modules/admin/sentOfferLog/pages/SentOfferLog"));
const Email = lazy(() => import("../../modules/admin/email/page/Email"));
const SMS = lazy(() => import("../../modules/admin/sms/page/SMS"));


export const AdminRoutes = [
  <Route path="dashboard" element={<Dashboard />} />,
  <Route path="sent-offer" element={<SentOfferLog />} />,
  <Route path="email" element={<Email />} />,
  <Route path="sms" element={<SMS />} />,
  <Route path="/*" element={<Navigate replace to="/admin/dashboard" />} />,
];

export const AdminLinks = [
  { icon: GridViewIcon, link: "/dashboard" },
  { icon: SendIcon, link: "/sent-offer" },
  { icon: EmailIcon, link: "/email" },
  { icon: SmsIcon, link: "/sms" }
];
