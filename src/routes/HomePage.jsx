import { useEffect, useState } from "react";
import Post from "../components/Post";
import { supabase } from '../client';


const HomePage = () => {

  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchPosts().catch(console.error);
  }, []);

  const fetchPosts = async () => {
    const {data} = await supabase
      .from('posts')
      .select()
      .order('created_at', { ascending: false });

    setPosts(data);
    setSortBy('date');
  };

  const sortPostsByDate = () => {
    let temp = posts.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
    setPosts(temp);
    setSortBy('date');
  };

  const sortPostsByVote = () => {
    let temp = posts.sort((a, b) => parseInt(b.upvotes) - parseInt(a.upvotes));
    setPosts(temp);
    setSortBy('vote');
  };

  const formatTime = (time) => {
    let postedTime = (Date.now() - Date.parse(time))/1000;

    if (postedTime <= 60)
      return `${Math.floor(postedTime)} seconds`;
    if (postedTime <= 60*60)
      return `${Math.floor(postedTime/60)} minutes`;
    if (postedTime <= 60*60*24)
      return `${Math.floor(postedTime/(60*60))} hours`;
    if (postedTime <= 60*60*24*7)
      return `${Math.floor(postedTime/(60*60*24))} days`;
    if (postedTime <= 60*60*24*30)
      return `${Math.floor(postedTime/(60*60*24*7))} weeks`;
    if (postedTime <= 60*60*24*7*52)
      return `${Math.floor(postedTime/(60*60*24*30))} months`;
    if (postedTime > 60*60*24*7*52)
      return `${Math.floor(postedTime/(60*60*24*7*52))} years`;
  }

  return (
    <div className="home-page">
      <div className="sort-container">
        Order by:
        <span onClick={sortPostsByDate} className={sortBy == 'date' ? 'selected' : ''}>Newest</span>
        <span onClick={sortPostsByVote} className={sortBy == 'vote' ? 'selected' : ''}>Most Popular</span>
      </div>
      {posts && posts.length > 0 ?
        <div>
          {posts.map((item) => (
            <Post
              key={item.id}
              id={item.id}
              time={formatTime(item.created_at)}
              title={item.title}
              upvotes={item.upvotes}
            />
          ))}
        </div> :
        <div>There is no post.</div>}
    </div>
  );
};

export default HomePage;