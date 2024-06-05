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
import ForgetPassword from "../modules/auth/pages/ForgetPassword";
import VerifyCode from "../modules/auth/pages/VerifyCode";
import SetPassword from "../modules/auth/pages/SetPassword";

function Root({ checked }) {
  const { user } = useSelector(({ auth }) => auth);
  return (
    <BrowserRouter>
      <React.Suspense fallback={<SuspenseLoader />}>
        {checked ? (
          <>
            {user && user?.userObject?.role == "user" && (
              <Routes>
                <Route path="/user/*" element={<AdminRouter />} />
                <Route path="/*" element={<Navigate replace to="/user" />} />
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
                  <Route path="forget-password" element={<ForgetPassword />} />
                  <Route path="verify-code" element={<VerifyCode />} />
                  <Route path="set-password" element={<SetPassword />} />
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
