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

    var inputSpeed = isNaN(parseFloat(inputs["speed"])) ? 0.0 : parseFloat(inputs["speed"])
    var inputColor = inputs["color"] === "" ? "White" : inputs["color"]

    await supabase
      .from('crewmates')
      .insert({name: inputs["name"], speed: inputSpeed, color: inputColor});

    setInputs({
      'name': '',
      'speed': '',
      'color': ''
    });

    alert("Post is created successfully!");
  };

  return (
    <div className="create-page">
      <h2>Create a New Post</h2>
      <form className="form-container">
        <input type="text" name="title" id="title" placeholder="Title" onChange={handleChange} value={inputs["title"]} />
        <textarea name="content" id="content" placeholder="Content (Optional)" rows="10">{inputs["content"]}</textarea>
        <input type="url" name="imageUrl" id="imageUrl" placeholder="Image URL (Optional)" onChange={handleChange} value={inputs["imageUrl"]} />
      </form>
      <button type="submit" onClick={createPost}>Create Post</button>
    </div>
  );
};

export default CreatePage;