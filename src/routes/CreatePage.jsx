import { useState } from "react";
import { supabase } from "../client";


const CreatePage = () => {
  const [inputs, setInputs] = useState({
    'title': '',
    'content': '',
    'imageUrl': ''
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const createPost = async (e) => {
    e.preventDefault();

    await supabase
      .from('posts')
      .insert({title: inputs["title"], content: inputs["content"], imageUrl: inputs["imageUrl"], upvotes: 0});

    setInputs({
      'title': '',
      'content': '',
      'imageUrl': ''
    });

    alert("Post is created successfully!");
  };

  return (
    <div className="create-page">
      <h2>Create a New Post</h2>
      <form className="form-container">
        <input type="text" name="title" id="title" placeholder="Title" onChange={handleChange} value={inputs["title"]} />
        <textarea name="content" id="content" placeholder="Content (Optional)" rows="10" onChange={handleChange} value={inputs["content"]}></textarea>
        <input type="url" name="imageUrl" id="imageUrl" placeholder="Image URL (Optional)" onChange={handleChange} value={inputs["imageUrl"]} />
      </form>
      <button type="submit" onClick={createPost}>Create Post</button>
    </div>
  );
};

export default CreatePage;