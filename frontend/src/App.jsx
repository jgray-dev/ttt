import './index.css'
import Backdrop from './components/Backdrop/Backdrop.jsx'
import Navbar from './components/Navbar.jsx'
import {useState, useEffect} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Accounts from "./pages/Accounts.jsx";
import Guidlines from "/Users/donjuan/Downloads/projects/ttt/frontend/src/pages/Guidelines.jsx";
import Threads from "./pages/Threads.jsx";




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
        <div className = "App">
            <Home />
            <Accounts />
            <Guidlines />
            <Threads />
            <Footer />
            <Navbar />
            <Search />
        </div>

    );
}
    export default App;



    //test for branch