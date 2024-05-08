import './index.css'
import Backdrop from './components/Backdrop/Backdrop.jsx'
import Navbar from './components/Navbar.jsx'
import {useState, useEffect} from 'react'
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Guidelines from "./pages/Guidelines.jsx";
import Thread from "./pages/Thread.jsx";
import {readCookie} from "./components/Functions.js";

export const url = 'http://67.164.191.36:4000/api'

function App() {
  const [threads, setThreads] = useState()
  const [user, updateUser] = useState()

  function setUser(newUser) {
    updateUser(newUser)
  }

  useEffect(() => {
//    Sessions wont work on Vite/home backend server. Using cookies as alternative
//    fetch(`${url}/checksession`)
//      .then(r => r.json())
//      .then(resp => {
//        if (resp.ok) {
//          console.log("CS: ", resp)
//          setUser(resp['user'])
//        } else {
//          console.log("NOT OK CS")
//        }
//      })


    const cookies = readCookie()
    if (cookies.username) {
      console.log(cookies.username)
      setUser(cookies.username)
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
          <Navbar user={user} setUser={setUser} logOut={logOut}/>
          <Routes>
            <Route path="/" element={<Navigate to="/home"/>}/>
            <Route path="/home" element={<Home threads={threads} user={user}/>}/>
            <Route path="/guidelines" element={<Guidelines/>}/>
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