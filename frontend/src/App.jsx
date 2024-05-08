import './index.css'
import Backdrop from './components/Backdrop/Backdrop.jsx'
import Navbar from './components/Navbar.jsx'
import {useState, useEffect} from 'react'
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Guidelines from "./pages/Guidelines.jsx";
import Thread from "./pages/Thread.jsx";

export const url = 'http://localhost:4000/api'

function App() {
  const [threads, setThreads] = useState()
  const [pageNumber, setPageNumber] = useState(1)
  const [user, updateUser] = useState()

  function setUser(newUser) {
    updateUser(newUser)
  }

  useEffect(() => {
    fetch(`${url}/checksession`)
      .then(r => r.json())
      .then(resp => {
        if (resp.ok) {
          console.log("CS: ", resp)
          setUser(resp['user'])
        } else {
          console.log("NOT OK CS")
        }
      })

    fetch(`${url}/threads/${pageNumber}`)
      .then(r => r.json())
      .then(data => {
        const sortedThreads = data.sort((a, b) => b.last_updated - a.last_updated);
        setThreads(sortedThreads);
      });
  }, []);


  return (
    <div className="">
      <BrowserRouter>
        <Backdrop/>
        <div className="fixed top-16 w-full h-full bg-black/25">
          <Navbar user={user} setUser={setUser}/>
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
            <Route path="/thread/:id" element={<Thread/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;