import {useEffect, useState} from "react";
import {url} from "../App.jsx";
import {getTime} from "../components/Functions.js";

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


  return (
    <div className="h-[200%]">
      <div className="h-screen overflow-y-scroll pb-48" id="homecards">
        {cards}
      </div>
    </div>
  );
};
