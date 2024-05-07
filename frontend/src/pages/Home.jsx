import Navbar from "../components/Navbar"
import {useEffect, useState} from "react";

export default function Home({threads}) {
  const [cards, setCards] = useState()
  useEffect(() => {
    if (threads) {
      const display = threads.map(thread => {
        return (
          <a href={`/thread/${thread.id}`} key={thread.id}>
            <div className="w-[95%] md:w-[65%] mx-auto my-4 bg-white/35 rounded-lg h-auto">
              <div className="flex flex-col justify-center">
                <div className="flex flex-row justify-between px-2 pt-1">
                  <div className="pr-2">
                    {thread.title} TITLE
                  </div>
                  <div className="pl-2 text-right w-[100%] bg-red-400">
                    {getTime(thread.last_updated)} ago
                  </div>
                </div>
                <div className="flex flex-row justify-between px-2 pt-4">
                  <div className="pr-2">
                    {thread.id} this is the threads ID
                  </div>
                  <div className="pl-2 text-right">
                    {thread.author_id} this is the author ID
                  </div>
                </div>
              </div>
              <br/>
            </div>
          </a>
        )
      })
      setCards(display)
    }
  }, [threads])

  // This function was created by Claude (AI) to take seconds as an argument and return the time in days/months/years, etc for readability.
  // It was modified by Jackson so the argument is instead the last_updated time of a thread
  function getTime(updatedTime) {
    const seconds = (parseInt(Date.now() / 1000) - updatedTime)
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (seconds < minute) {
      return seconds === 1 ? "1 second" : `${seconds} seconds`;
    } else if (seconds < hour) {
      const minutes = Math.floor(seconds / minute);
      return minutes === 1 ? "1 minute" : `${minutes} minutes`;
    } else if (seconds < day) {
      const hours = Math.floor(seconds / hour);
      return hours === 1 ? "1 hour" : `${hours} hours`;
    } else if (seconds < week) {
      const days = Math.floor(seconds / day);
      return days === 1 ? "1 day" : `${days} days`;
    } else if (seconds < month) {
      const weeks = Math.floor(seconds / week);
      return weeks === 1 ? "1 week" : `${weeks} weeks`;
    } else if (seconds < year) {
      const months = Math.floor(seconds / month);
      return months === 1 ? "1 month" : `${months} months`;
    } else {
      const years = Math.floor(seconds / year);
      return years === 1 ? "1 year" : `${years} years`;
    }
  }

  return (
    <div className="home-container">
      <div className="overflow-y-auto">
        <h1>Welcome to Taylor's Home page</h1>
        {cards}
      </div>
    </div>
  );
};
