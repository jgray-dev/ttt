import {useEffect, useState} from "react";
import {url} from "../App.jsx";

export default function Home({threads, user}) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  let totalThreads = threads;
  const [cards, setCards] = useState();

  if (user) {
    console.log("User");
  }

  useEffect(() => {
    const handleScroll = () => {
      const div = document.querySelector(".h-screen.overflow-y-scroll.pb-48");
      const scrollTop = div.scrollTop;
      const scrollHeight = div.scrollHeight;
      const clientHeight = div.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 250 && !loading) {
        setLoading(true);
        console.log("Loading more cards")
        getMoreCards(page)
      }
    };

    const div = document.getElementById("homecards");
    div.addEventListener('scroll', handleScroll);

    return () => {
      div.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  function getMoreCards() {
    fetch(`${url}/threads/${page + 1}`)
      .then(r => r.json())
      .then(response => {
        console.log(response)
        const oldCards = cards
        const newCards = getCards(response)
        setCards([oldCards, newCards])
        setLoading(false)
      })
    setPage(page + 1)
  }

  useEffect(() => {
    if (totalThreads) {
      const display = getCards(totalThreads)
      setCards(display)
    }
  }, [threads])


  function getCards(threads) {
    return threads.map(thread => {
      return (
        <a href={`/thread/${thread.id}`} key={thread.id}>
          <div className="w-[95%] md:w-[65%] mx-auto my-4 bg-black/35 text-white rounded-lg h-auto">
            <div className="flex flex-col justify-center">
              <div className="flex flex-row justify-between px-2 pt-1">
                <div className="pr-2 font-bold">
                  {thread.title}
                </div>
                <div className="pl-2 text-right w-fit text-nowrap">
                  {getTime(thread.last_updated)} ago
                </div>
              </div>
              <div className="flex flex-row justify-between px-2 pt-4">
                <div className="pr-2">
                  By {thread.author.username}
                </div>
                <div className="pl-2 text-right">
                  {thread.id}
                </div>
              </div>
            </div>
            <br/>
          </div>
        </a>
      )
    })
  }

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
    <div className="h-[200%]">
      <div className="h-screen overflow-y-scroll pb-48" id="homecards">
        {cards}
      </div>
    </div>
  );
};
