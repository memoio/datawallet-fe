"use client"
import Aos from 'aos';
import React, { ReactNode, useEffect } from 'react'
import "aos/dist/aos.css";
interface AppWrapperProps {
    children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
    useEffect(() => {
        Aos.init({
            easing: "ease-in-out",
            duration: 800,
        });
    }, []);
    return (
        <div>
            {children}
        </div>
    )
}

export default AppWrapper