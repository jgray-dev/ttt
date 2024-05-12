import './index.css'
import Backdrop from './components/Backdrop/Backdrop.jsx'
import Navbar from './components/Navbar.jsx'
import {useState, useEffect} from 'react'
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Guidelines from "./pages/Guidelines.jsx";
import Thread from "./pages/Thread.jsx";
import login from "./pages/Login.jsx";
import {readCookie} from "./components/Functions.js";

export const url = 'https://mynameisnt.kim/ttt/api'
// export const url = 'http://localhost:4000/api'


function App() {
  const [threads, setThreads] = useState()
  const [user, updateUser] = useState()
  const [userid, setUserId] = useState()

  function setUser(newUser) {
    updateUser(newUser)
  }

  useEffect(() => {
    const cookies = readCookie()
    if (cookies.username) {
      setUser(cookies.username)
      setUserId(cookies.id)
    }

    fetch(`${url}/threads/1`)
      .then(r => r.json())
      .then(data => {
        setThreads(data);
      });
  }, []);

  function logOut() {
    updateUser(undefined)
  }

  return (
    <div className="">
      <BrowserRouter>
        <Backdrop/>
        <div className="fixed top-16 w-full h-full bg-black/25">
          <Navbar user={user} setUser={setUser} logOut={logOut} userid={userid}/>
          <Routes>
            <Route path="/" element={<Navigate to="/home"/>}/>
            <Route path="/home" element={<Home threads={threads} user={user}/>}/>
            <Route path="/guidelines" element={<Guidelines/>}/>
            <Route path="/login" element={<Login setUser={setUser} logOut={logOut} user={user}/>}/>
            <Route element={
              <div>
                {threads ? threads.map(thread => (
                  <Link key={thread.id} to={`/thread/${thread.id}`}>{thread.title}</Link>
                )) : <></>}
              </div>
            }/>
            <Route path="/thread/:id" element={<Thread user={user}/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;