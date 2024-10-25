import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const accessToken = localStorage.getItem('accessToken');
    const storedData = localStorage.getItem('accountData');
    const accountData = JSON.parse(storedData);  // Convert back to an object
    console.log("NAME: " + accountData.role);
    // Check if user is logged in and has a valid role
    if (!accessToken || !allowedRoles.includes(accountData.role)) {
        console.log("Redirecting to home page");
        return <Navigate to="/" replace />;
    }

    // Render the child components if the user has the right role
    return children;
};

// Define PropTypes for the component
ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, // Allowed roles should be an array of strings
    children: PropTypes.node.isRequired, // Children is required and can be any renderable content
};

export default ProtectedRoute;