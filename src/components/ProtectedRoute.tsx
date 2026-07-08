import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "react-bootstrap/esm/Spinner";

const ProtectedRoute = () => {
    const {
        isAuthenticated,
        loading,
    } = useAuth();

    const location = useLocation();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                }}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;