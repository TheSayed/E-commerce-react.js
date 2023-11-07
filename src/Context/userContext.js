import React, { createContext, useState } from 'react';
// Initialize UserContext with a default value
export const UserContext = createContext(null);

export default function UserContextProvider(props) {

    const [userToken, setUserToken] = useState(null);

    return (
        <UserContext.Provider value={{ setUserToken, userToken }}>
            {props.children}
        </UserContext.Provider>
    );
}

