import {useState} from "react";
import {FaUserAlt} from "react-icons/fa";
import Account from "./Account.jsx";


export default function Navbar({user, setUser, logOut, userid}) {
  const [accountOpen, setAccountOpen] = useState(false)
  const [accountPage, setAccountPage] = useState(<></>)


  function hideAccount() {
    setAccountPage(null);
    setAccountOpen(false)
  }


  function showAccount() {
    setAccountPage(<Account hideAccount={hideAccount} user={user} setUser={setUser} logOut={logOut} userid={userid}/>);
    setAccountOpen(true)
  }

  function handleAccountClick() {
    accountOpen ? hideAccount() : showAccount()
  }

  return (
    <div className="fixed w-screen select-none">
      <div className="fixed top-0 w-full h-16 bg-black/50 flex justify-between items-center px-4">
        <a href="/home">
          <img
            src={`https://mynameisnt.kim/uploads/images/ttt.png`}
            alt="logo"
            height="80"
            width="350"
            className="ml-1 md:block hidden"
          />
          <img
            src={`https://mynameisnt.kim/uploads/images/ttt_mobile.png`}
            alt="logo"
            height="80"
            width="40"
            className="m-1.5 md:hidden block"
          />
        </a>
        <div className="cursor-pointer p-4"
             onClick={() => {
               handleAccountClick()
             }}>
          <FaUserAlt className={`${user ? "fill-white" : "fill-red-400"} h-6 w-6`}/>
        </div>
      </div>
      {accountPage}
    </div>
  );
}


// Kaleab edit with sign in button added

