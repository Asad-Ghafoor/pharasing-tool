import React from "react";
import { Routes } from "react-router-dom";
import SuspenseLoader from "../../components/loader/SuspenseLoader";
import {
  AdminLinks,
  AdminRoutes,
} from "./AdminLinks";
import AdminLayout from "../../components/layouts/admin/pages/AdminLayout";

function AdminRouter() {
  return (
    <AdminLayout
      navLinks={AdminLinks}
      // user={user}
    >
      <React.Suspense fallback={<SuspenseLoader />}>
        <Routes>{AdminRoutes.map((route, index) => <React.Fragment key={index}>{route}</React.Fragment>)}</Routes>
      </React.Suspense>
    </AdminLayout>
  )
}

export default AdminRouter;