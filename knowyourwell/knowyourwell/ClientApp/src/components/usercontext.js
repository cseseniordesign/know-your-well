import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext(null);

// Hook for easy usage of the context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to hold user information

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};