import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {url} from "../App.jsx";

function Thread() {
  const {id} = useParams();
  const [thread, setThread] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${url}/thread/${id}`)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        setThread(data);
        formatPosts(data.posts)
      });
  }, [id]);

  function formatPosts(posts) {
    posts.sort((a, b) => a.time_created - b.time_created);
    setPosts(posts)
    return posts;
  }

  return (
    thread ?
      <div className="h-full w-full pt-4 overflow-y-scroll pb-36">
        <span className="text-xl font-bold mx-4">{thread.title}</span>
        <div key={thread.time_created}
             className="border border-gray-300 p-4 md:mx-10 mx-4 mb-20 rounded-lg bg-white/25">
          <h3 className="text-lg font-bold">{thread.author.username}</h3> {/* Display the author's username */}
          <p
            className="text-sm text-gray-500">{new Date(thread.time_created * 1000).toLocaleString()}</p> {/* Convert unix timestamp to date string */}
          <p className="mt-2">{thread.content}</p>
        </div>
        {posts.map((post, index) => (
          <div key={index} className="border border-gray-300 p-4 mb-4 md:mx-10 mx-4 rounded-lg bg-white/25">
            <h3 className="text-lg font-bold">{post.author.username}</h3> {/* Display the author's username */}
            <p
              className="text-sm text-gray-500">{new Date(post.time_created * 1000).toLocaleString()}</p> {/* Convert unix timestamp to date string */}
            <p className="mt-2">{post.content}</p>
          </div>
        ))}
        <div className="w-full text-center">
          <button className="bg-white/20 text-black border-white border px-4 py-2 rounded-md">
            Reply
          </button>

        </div>

      </div>
      :
      <div>
        Loading thread...
      </div>
  );
}

export default Thread;