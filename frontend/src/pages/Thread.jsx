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
        setPosts(data.posts);
      });
  }, [id]);

  return (
    thread ?
      <div className="h-full w-full bg-red-400">
        <h2>{thread.title}</h2>
        {posts.map((post, index) => (
          <div key={index} className="border border-gray-300 p-4 mb-4">
            <h3 className="text-lg font-bold">{post.author.username}</h3> {/* Display the author's username */}
            <p className="text-sm text-gray-500">{new Date(post.time_created * 1000).toLocaleString()}</p> {/* Convert unix timestamp to date string */}
            <p className="mt-2">{post.content}</p>
          </div>
        ))}
      </div>
      :
      <div>
        Loading thread...
      </div>
  );
}

export default Thread;