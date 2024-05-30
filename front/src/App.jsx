import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
// components
import WebTheme from "./themes/WebTheme";
import Root from "./routes/Root";
// APIs
import { AuthAPI } from "./axios";
// actions
import { setUser, setRefetch, setLoading } from "./features/authSlice";

function App() {
  const [checked, setChecked] = useState(true);
  const [_id, set_id] = useState(null);
  const { user, refetch, isLoading } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const id = user.userObject.id;
      set_id(id);
    }
  }, [user]);

  useEffect(() => {
    if (!refetch && !user && !isLoading) {
      dispatch(setLoading(true));
      let token = localStorage.getItem("accessToken");
      if (token) {
        AuthAPI.getUserProfile(_id)
          .then((res) => {
            if (res?.code == 200) {
              dispatch(setLoading(false));
              console.log(res);
              dispatch(setUser(res?.data));
              setChecked(true);
            }
          })
          .catch((err) => {
            dispatch(setLoading(false));
            console.log(err);
            dispatch(setUser(null));
            setChecked(true);
          });
        setChecked(true);
      } else {
        dispatch(setLoading(false));
        console.log("no token found");
        dispatch(setUser(null));
        setChecked(true);
      }
    }
  }, []);

  useEffect(() => {
    if (refetch && !isLoading) {
      dispatch(setLoading(true));
      let token = localStorage.getItem("accessToken");
      if (token) {
        AuthAPI.getUserProfile(_id)
          .then((res) => {
            if (res?.code == 200) {
              dispatch(setLoading(false));
              console.log(res);
              dispatch(setRefetch(false));
              dispatch(setUser(res?.data));
              setChecked(true);
            }
          })
          .catch((err) => {
            dispatch(setLoading(false));
            console.log(err);
            dispatch(setRefetch(false));
            dispatch(setUser(null));
            setChecked(true);
          });
        setChecked(true);
      } else {
        dispatch(setLoading(false));
        console.log("no ref token found");
        dispatch(setRefetch(false));
        dispatch(setUser(null));
        setChecked(true);
      }
    }
  }, [refetch]);

  return (
    <ThemeProvider theme={WebTheme}>
      <Root checked={checked} />
    </ThemeProvider>
  );
}

export default App;
