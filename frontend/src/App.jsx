import './index.css'
import Backdrop from './components/Backdrop/Backdrop.jsx'
import Navbar from './components/Navbar.jsx'
import {useState, useEffect} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Accounts from "./pages/Accounts.jsx";


function App() {
    const [width, setWidth] = useState(window.innerWidth);


    // set isMobile to true/false depending on if screen size is > or < than 768
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    const isMobile = width <= 768;

    return (
        <div>
            <BrowserRouter>
                <Backdrop />
                <Navbar isMobile={isMobile}/>
                <div className="overflow-hidden">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home"/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/account" element={<Accounts/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
        );
}

export default App
