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

  return (
    <div className="home-page">
      <div className="sort-container">
        Order by:
        <span className={sortBy == 'date' ? 'selected' : ''}>Newest</span>
        <span className={sortBy == 'vote' ? 'selected' : ''}>Most Popular</span>
      </div>
      {posts && posts.length > 0 ?
        <div>
          {posts.map((item) => (
            <Post
              key={item.id}
              id={item.id}
              time={item.created_at}
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