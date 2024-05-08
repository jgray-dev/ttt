import {useEffect, useState} from "react";
import {url} from "../App.jsx";
import {getTime} from "../components/Functions.js";
import {IoIosCloseCircleOutline} from "react-icons/io";
import {useNavigate} from "react-router-dom";

export default function Home({threads, user}) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  let totalThreads = threads;
  const [cards, setCards] = useState();
  const [newThreadOpen, setNewThreadOpen] = useState(false)
  const [newThread, setNewThread] = useState(<></>)


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


  function hideNewThread() {
    setNewThreadOpen(false)
    setNewThread(<></>)

  }

  function clickNewThread() {
    console.log(newThreadOpen)
    if (newThreadOpen) {
      hideNewThread()
    } else {
      if (user) {
        setNewThread(<NewThread/>)
        setNewThreadOpen(true)

      } else {
        alert("Please sign in before creating a new thread")
      }
    }
  }

  function NewThread() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    function handleSubmit() {
      if (content !== "") {
        console.log(content)
        fetch(`${url}/newthread`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "username": user,
            "content": content,
            "title": title
          })
        })
          .then(r => r.json())
          .then(response => {
            console.log(response)
            if (response.id) {
              hideNewThread()
              navigate(`/thread/${response.id}`)
            }
            console.log(response)
          })
      } else {
        alert("Please add some content before submitting")
      }
    }

    return (
      <div
        className="h-screen w-screen fixed backdrop-blur-md top-0 left-0"
        onClick={() => {
          hideNewThread()
        }}
      >
        <div
          className="mt-12 sm:w-[80%] bg-rose-100/80 mx-auto rounded-3xl p-3 h-fit"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-full text-right">
            <IoIosCloseCircleOutline className={"h-8 w-8 fill-red-500 hover:fill-red-400 ml-auto"}
                                     onClick={() => hideNewThread()}/>
          </div>
          <div className="font-bold font-xl w-full text-center">Create new thread</div>
          <div className="text-left w-full pt-12">
            Title
            <input className="w-full bg-white/30 mb-4 rounded-md placeholder-black/50" value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   placeholder="Enter title here"/>
            Content
            <textarea
              className="bg-white/30 resize-none w-full mt-4 placeholder-black/50 rounded-lg p-2" rows={10}
              placeholder={"Enter content here"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            >

              </textarea>
            <button
              className="bg-gradient-to-br text-zinc-200 font-bold from-blue-400 hover:from-sky-400 hover:to-emerald-400 hover:text-white to-green-400 py-2 px-4 rounded-lg"
              onClick={() => handleSubmit()}>
              submit
            </button>
          </div>

        </div>
      </div>
    );

  }

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
        <div
          className="fixed bg-gradient-to-r from-rose-300/55 via-emerald-100/55 to-orange-300/55 backdrop-blur-sm w-full flex flex-row justify-center">
          <button
            className="bg-white/60 font-bold text-black border-white border my-2 md:my-2 py-1 px-3 mr-12 rounded-md hover:bg-white/85"
            onClick={() => clickNewThread()}>
            New thread
          </button>
        </div>
        <div className="pt-12">

          {newThread}
          {cards}
        </div>
      </div>
    </div>
  );
};
