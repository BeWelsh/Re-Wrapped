import React from 'react'
import { useEffect } from "react";
//Secret: "8f7efe34265748668d254a3da349f30c"
/**
 * This will check the callback url for a code
 * If there is one,
 */
const CallbackPage = () => {
    const queryParams = new URLSearchParams(window.location.search);
    //Gets the specific code from the url, if none returns:
    const code = queryParams.get("code");

    useEffect(() => {
        //Gets all parameters from the url
        const queryParams = new URLSearchParams(window.location.search);
        //Gets the specific code from the url, if none returns:
        const code = queryParams.get("code");

        if (code) {
            // Send the code to your backend to exchange for tokens
            //fetchAccessToken(code);
        }
    }, []);

    return <div>{code}</div>
};

export default CallbackPage;