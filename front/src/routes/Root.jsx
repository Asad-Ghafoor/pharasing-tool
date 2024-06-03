import React, { lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SuspenseLoader from "../components/loader/SuspenseLoader";
import { useSelector } from "react-redux";
// layouts
import AuthLayout from "../modules/auth/Layout";
//routers
import AdminRouter from "./admin/adminRouter";
//components
const Login = lazy(() => import("../modules/auth/pages/Login"));
const SignUP = lazy(() => import("../modules/auth/pages/SignUp"));

function Root({ checked }) {
  const { user } = useSelector(({ auth }) => auth);
  return (
    <BrowserRouter>
      <React.Suspense fallback={<SuspenseLoader />}>
        {checked ? (
          <>
            {user && user?.userObject?.role == "admin" && (
              <Routes>
                <Route path="/admin/*" element={<AdminRouter />} />
                <Route path="/*" element={<Navigate replace to="/admin" />} />
              </Routes>
            )}
            {!user && (
              <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                  <Route
                    index
                    element={<Navigate replace to="/auth/login" />}
                  />
                  <Route path="login" element={<Login />} />
                  <Route path="sign-up" element={<SignUP />} />
                </Route>
                <Route path="/*" element={<Navigate replace to="/auth" />} />
              </Routes>
            )}
          </>
        ) : null}
      </React.Suspense>
    </BrowserRouter>
  );
}

export default Root;
