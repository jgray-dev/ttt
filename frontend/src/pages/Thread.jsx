import {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {url} from "../App.jsx";
import {getTime} from "../components/Functions.js";
import {IoIosCloseCircleOutline} from "react-icons/io";

function Thread({user}) {
  const repliesRef = useRef(null);
  const {id} = useParams();
  const [thread, setThread] = useState();
  const [page, setPage] = useState(1);
  const [postCards, setCards] = useState();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [replyOpen, setReplyOpen] = useState(false)
  const [reply, setReply] = useState(<></>)

  useEffect(() => {
    fetch(`${url}/thread/${id}`)
      .then(r => r.json())
      .then(data => {
        setThread(data);
      });
  }, [id]);

  useEffect(() => {
    getPosts();
  }, [page]);

  function getPosts() {
    setLoading(true);
    fetch(`${url}/posts/${id}/${page}`)
      .then(r => r.json())
      .then(data => {
        if (!data.error) {
          const newPosts = [...posts, ...data];
          setPosts(newPosts);
          setLoading(false);
        }
      });
  }

  useEffect(() => {
    const postCards = formatPosts();
    setCards(postCards);
  }, [posts]);

  useEffect(() => {
    const handleScroll = () => {
      const div = repliesRef.current;
      if (div) {
        const scrollTop = div.scrollTop;
        const scrollHeight = div.scrollHeight;
        const clientHeight = div.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight - 250 && !loading) {
          setPage(prevPage => prevPage + 1);
        }
      }
    };

    const div = repliesRef.current;
    if (div) {
      div.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (div) {
        div.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loading]);

  function formatPosts() {
    return posts.map((post, index) => (
        <div key={index} className="border border-gray-300 p-4 mb-4 md:mx-10 mx-4 rounded-lg bg-white/25">
          <h3 className="text-lg font-bold">{post.author.username}</h3>
          <p className="text-sm text-gray-500">{getTime(post.time_created)} ago</p>
          <p className="mt-2">{post.content}</p>
        </div>
      )
    );
  }


  function hideReply() {
    setReply(<></>)
    setReplyOpen(false)
  }

  function clickReply() {
    if (replyOpen) {
      hideReply()
    } else {
      setReply(<Reply hideReply={hideReply} user={user}/>);
    }
    setReplyOpen(!replyOpen)
  }

  function Reply() {
    const [content, setContent] = useState("");

    function handleSubmit() {
      if (content !== "") {
        console.log(content)
      } else {
        alert("Please add some content before submitting")
      }
    }

    return (
      <div
        className="h-screen w-screen fixed backdrop-blur-md top-0 left-0"
        onClick={() => {
          hideReply()
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
                                     onClick={() => hideReply()}/>
          </div>
          <div className="text-center w-full">
            <textarea
              className="bg-white/30 resize-none w-full mt-12 placeholder-black/50 rounded-lg p-2" rows={10}
              placeholder={"Enter reply here"}
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


  return (
    thread ? (
        <div className="h-full w-full overflow-y-scroll pb-36" id="replies" ref={repliesRef}>
          <div
            className="fixed bg-gradient-to-r from-rose-300/55 via-emerald-100/55 to-orange-300/55 backdrop-blur-sm w-full flex flex-row justify-between">
            <div className="text-xl font-bold mx-4 py-4">{thread.title}</div>
            <button
              className="bg-white/60 font-bold text-black border-white border my-6 md:my-2 py-1 px-3 mr-12 rounded-md hover:bg-white/85"
              onClick={() => clickReply()}>
              Reply
            </button>
          </div>
          <div key={thread.time_created}
               className="border border-gray-300 p-4 md:mx-10 mx-4 mb-20 rounded-lg bg-white/25 mt-24">
            <h3 className="text-lg font-bold">{thread.author.username}</h3>
            <p className="text-sm text-gray-500">{getTime(thread.time_created)} ago</p>
            <p className="mt-2">{thread.content}</p>
          </div>
          {postCards}
          {reply}
          <div className="w-full text-center">
            End of thread.
          </div>
        </div>
      ) :
      (
        <div>Loading thread...</div>
      )
  )
    ;
}

export default Thread;