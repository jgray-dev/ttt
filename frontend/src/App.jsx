import './index.css'
import Backdrop from './components/Backdrop/Backdrop.jsx'
import Navbar from './components/Navbar.jsx'
import {useState, useEffect} from 'react'
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Accounts from "./pages/Accounts.jsx";
import Guidelines from "./pages/Guidelines.jsx";
import Thread from "./pages/Thread.jsx";

export const url = 'http://67.164.191.36:4000/api'

function App() {
  const [threads, setThreads] = useState()

  useEffect(() => {
    console.log(`${url}/threads`);
    fetch(`${url}/threads`)
      .then(r => r.json())
      .then(data => {
        console.log(data);
        const sortedThreads = data.sort((a, b) => b.last_updated - a.last_updated);
        setThreads(sortedThreads);
      });
  }, []);

  return (
    <div className="w-screen h-screen text-black">
      <BrowserRouter>
        <Backdrop/>
        <div className="fixed top-16 w-full h-full bg-black/25">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Navigate to="/home"/>}/>
            <Route path="/home" element={<Home threads={threads}/>}/>
            <Route path="/account" element={<Accounts/>}/>
            <Route path="/guidelines" element={<Guidelines/>}/>
            <Route element={
              <div>
                {threads ? threads.map(thread => (
                  <Link key={thread.id} to={`/thread/${thread.id}`}>{thread.title}</Link>
                )) : <></>}
              </div>
            }/>
            <Route path="/thread/:id" element={<Thread/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;