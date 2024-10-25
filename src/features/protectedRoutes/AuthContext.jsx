import PropTypes from 'prop-types';
import { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const AuthContext = createContext(null);

// Create a provider component
export function AuthProvider({ children }) {
    const [userName, setUserName] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [role, setRole] = useState('');
    const [accountId, setAccountId] = useState('');
    const [breederName, setBreederName] = useState('');

    useEffect(() => {
        // Get the account data from localStorage
        const storedData = localStorage.getItem('accountData');
        if (storedData) {
            const accountData = JSON.parse(storedData);
            setUserName(`${accountData.firstName} ${accountData.lastName}`);
            setRole(accountData.role);
            setAccountId(accountData.accountId);
            setBreederName(accountData.breederName);
        }
        // Get tokens from localStorage
        setAccessToken(localStorage.getItem('accessToken'));
        setRefreshToken(localStorage.getItem('refreshToken'));
    }, []);

    return (
        <AuthContext.Provider
            value={{
                userName,
                accessToken,
                refreshToken,
                role,
                accountId,
                breederName,
                setAccountId,
                setUserName,
                setAccessToken,
                setRefreshToken,
                setRole,
                setBreederName
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// PropTypes to validate that children is passed
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook to use the auth context
export function useAuth() {
    return useContext(AuthContext);
}
