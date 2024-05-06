import {useState} from "react";
import {FaUserAlt} from "react-icons/fa";
import Account from "./Account.jsx";


export default function Navbar() {
  const user = "astro"
  const [accountOpen, setAccountOpen] = useState(false)
  const [accountPage, setAccountPage] = useState(<></>)

  function handleClick() {
    if (accountOpen) { // Clicked on account button again.. Hide page
      setAccountPage(<></>)
    } else {
      setAccountPage(<Account/>)
    }
    setAccountOpen(!accountOpen)
  }

  const handleLogin = () => {
    // Add login logic here, e.g., redirect to a login page or show a modal
    console.log("Login clicked");
  };

  const handleSignup = () => {
    // Add signup logic here, e.g., redirect to a signup page or show a modal
    console.log("Signup clicked");
  };

  return (
    <div className="fixed h-screen w-screen">
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
               handleClick()
             }}>
          <FaUserAlt className={"fill-white h-6 w-6"}/>
        </div>
      </div>
      {accountPage}
    </div>
  );
}


// Kaleab edit with sign in button added

