import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const role = localStorage.getItem("role");
	if (role !== "Admin") {
		return <Navigate to="/admin/login" replace />;
	}
	return children;
};

export const ProtectedUserRoute = ({ children }) => {
	const role = localStorage.getItem("role");
	if (role !== "User") {
		return <Navigate to="/user/login" replace />;
	}
	return children;
};

export default ProtectedRoute;
