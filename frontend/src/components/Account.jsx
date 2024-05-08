import {useEffect, useState} from "react";
import {url} from "../App.jsx";

export default function Account({hideAccount, user, setUser}) {
  const [siUsername, setSiUsername] = useState("")
  const [siPassword, setSiPassword] = useState("")

  const [suUsername, setSuUsername] = useState("")
  const [suEmail, setSuEmail] = useState("")
  const [suPassword, setSuPassword] = useState("")
  const [suPassword2, setSuPassword2] = useState("")


  function signIn() {
    console.log(siUsername, siPassword)
    fetch(`/account/signin`, {
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
        if (resp.message) {
          setUser(siUsername)
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
    <div className={`fixed w-full h-full bg-black/30 text-white`}
         onClick={() => {
           hideAccount()
         }}>
      <div
        className="mt-12 h-[80%]  w-[95%] sm:w-[80%] bg-black/90 mx-auto rounded-3xl p-3"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {user ?
          <div>
            USER IS SIGNED IN MODIFY ACCOUNT/LOGOUT HERE
          </div>
          :
          <div>
            <div className="bg-black/50 justify-between roudned-lg flex lg:flex-row flex-col h-full w-full text-center">
              <div className="h-full w-full mr-2">
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
              <div className="h-full w-full md:ml-2 md:mt-0 mt-4">
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