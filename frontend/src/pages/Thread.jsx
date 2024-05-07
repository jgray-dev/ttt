import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {url} from "../App.jsx";

function Thread() {
  const {id} = useParams();
  const [thread, setThread] = useState();
  const [posts, setPosts] = useState()

  useEffect(() => {
    fetch(`${url}/thread/${id}`)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        setThread(data);
      });
  }, [id]);

  return (
    thread ?
      <div className="h-full w-full bg-red-400">
        <h2>{thread.title}</h2>
      </div>
      :
      <div>
        Loading thread...
      </div>

  );
}

export default Thread;