import {useState} from "react";
import {BrowserView, MobileView, isBrowser, isMobile} from 'react-device-detect';


export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a state to track if the user is logged in or not

  const handleLogin = () => {
    // Add login logic here, e.g., redirect to a login page or show a modal
    console.log("Login clicked");
  };

  const handleSignup = () => {
    // Add signup logic here, e.g., redirect to a signup page or show a modal
    console.log("Signup clicked");
  };

  return (
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
      <div>
        {isLoggedIn ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsLoggedIn(false)}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className="bg-pink-950-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogin}
            >
              Sign In
            </button>
            <button
              className="bg-pink-950-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}


// Kaleab edit with sign in button added

