import React from "react";
import "./ProtectedAuth.module.css";
import { Navigate } from "react-router-dom";
export function ProtectedAuth(props) {
  if (localStorage.getItem("userToken")) {
    return <Navigate to="/"></Navigate>;
  } else {
    return props.children;
  }
}
