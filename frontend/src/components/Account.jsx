import {useState} from "react";
import {url} from "../App.jsx";
import {deleteAllCookies, updateCookie} from "./Functions.js";

export default function Account({hideAccount, user, setUser, logOut, userid}) {
  const [siUsername, setSiUsername] = useState("")
  const [siPassword, setSiPassword] = useState("")

  const [suUsername, setSuUsername] = useState("")
  const [suEmail, setSuEmail] = useState("")
  const [suPassword, setSuPassword] = useState("")
  const [suPassword2, setSuPassword2] = useState("")


  function signIn() {
    console.log(siUsername, siPassword)
    fetch(`${url}/account/signin`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": siUsername,
        "password": siPassword
      })
    })
      .then(r => r.json())
      .then(resp => {
        console.log(resp)
        if (!resp.error) {
          console.log(resp)
          setUser(siUsername)
          updateCookie(resp.username, resp.id)
          hideAccount()
        } else {
          alert(resp.error)
        }
      })
  }


  function signUp() {
    if (suUsername !== "" && suEmail !== "" && suPassword !== "" && suPassword2 !== "") {
      if (suPassword === suPassword2) {
        fetch(`${url}/account/create`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": suEmail,
            "username": suUsername,
            "password": suPassword
          })
        })
          .then(r => r.json())
          .then(resp => {
            if (resp.id) {
              updateCookie(resp.username, resp.id)
              setUser(resp.username)
              hideAccount()
            } else {
              alert(resp.error)
            }
          })
      } else {
        alert("Please enter all information")
      }
    }
  }


  return (
    <div className={`fixed w-screen h-screen bg-black/30 backdrop-blur-sm text-white z-50`}
         onClick={() => {
           hideAccount()
         }}>
      <div
        className="mt-24 h-fit w-[95%] sm:w-[80%] bg-black/30 mx-auto rounded-3xl p-3 z-50"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {user ?
          <div>
            <div className="w-full p-4">
              <div className={"text-xl font-bold text-white my-3"}>Currently signed in as {user}</div>
              <button className="bg-red-400 px-4 py-2 rounded-md" onClick={() => {
                logOut()
                hideAccount()
                deleteAllCookies()
                alert("Signed out successfully")
              }}>Log out
              </button>
            </div>
          </div>
          :
          <div>
            <div
              className="bg-black/50 rounded-md p-4 justify-between roudned-lg flex lg:flex-row flex-col h-full w-full text-center">
              <div className="h-full w-full mr-2 py-8">
                <span className="text-white text-xl">Sign in</span>
                <div className="flex flex-col">
                  <div>

                    <div className="flex flex-row justify-between">
                      <div className="mt-2">
                        Username
                      </div>
                      <div>
                        <input value={siUsername} onChange={(e) => setSiUsername(e.target.value)}
                               className="rounded-lg bg-zinc-300 ml-2 text-black placeholder-zinc-400 my-2 pl-1 mr-1"
                               placeholder="Enter username"/>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between">
                      <div className="mt-2">
                        Password
                      </div>
                      <div>
                        <input type="password" value={siPassword} onChange={(e) => setSiPassword(e.target.value)}
                               className="rounded-lg bg-zinc-300 ml-2 text-black placeholder-zinc-400 my-2 pl-1 mr-1"
                               placeholder="Enter password"/>
                      </div>
                    </div>
                  </div>
                  <button className="bg-sky-300 mx-auto px-4 py-2 rounded-lg" onClick={() => signIn()}>Sign In</button>
                </div>
              </div>
              <div className="h-full w-full md:ml-2 my-8">
                <span className="text-white text-xl">Sign up</span>


                <div className="flex flex-col">
                  <div>

                    <div className="flex flex-row justify-between">
                      <div className="mt-2">
                        Email
                      </div>
                      <div>
                        <input value={suEmail} onChange={(e) => setSuEmail(e.target.value)}
                               className="rounded-lg bg-zinc-300 ml-2 text-black placeholder-zinc-400 my-2 pl-1 mr-1"
                               placeholder="Enter email"/>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between">
                      <div className="mt-2">
                        Username
                      </div>
                      <div>
                        <input value={suUsername} onChange={(e) => setSuUsername(e.target.value)}
                               className="rounded-lg bg-zinc-300 ml-2 text-black placeholder-zinc-400 my-2 pl-1 mr-1"
                               placeholder="Enter username"/>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between">
                      <div className="mt-2">
                        Password
                      </div>
                      <div>
                        <input type="password" value={suPassword} onChange={(e) => setSuPassword(e.target.value)}
                               className="rounded-lg bg-zinc-300 ml-2 text-black placeholder-zinc-400 my-2 pl-1 mr-1"
                               placeholder="Enter password"/>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="mt-2">
                        Confirm
                      </div>
                      <div>
                        <input type="password" value={suPassword2} onChange={(e) => setSuPassword2(e.target.value)}
                               className="rounded-lg bg-zinc-300 ml-2 text-black placeholder-zinc-400 my-2 pl-1 mr-1"
                               placeholder="Confirm password"/>
                      </div>
                    </div>
                  </div>
                  <button className="bg-sky-300 mx-auto px-4 py-2 rounded-lg" onClick={() => signUp()}>Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}