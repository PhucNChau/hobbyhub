import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from '../client';

const EditPage = () => {
  const params = useParams();
  const [inputs, setInputs] = useState({
    'title': '',
    'content': '',
    'imageUrl': ''
  });
  const [crewmate, setCrewmate] = useState(null);

  useEffect (() => {
    // fetchCrewmate().catch(console.error);
  }, [])

  const fetchCrewmate = async () => {
    const {data} = await supabase
      .from('crewmates')
      .select()
      .eq('id', params.id);

    setCrewmate(data[0]);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const navigate = useNavigate();

  const updatePost = async (e) => {
    e.preventDefault();

    var inputSpeed = isNaN(parseFloat(inputs["speed"])) ? 0.0 : parseFloat(inputs["speed"])
    var inputColor = inputs["color"] === "" ? "White" : inputs["color"]

    await supabase
      .from('crewmates')
      .update({name: inputs["name"], speed: inputSpeed, color: inputColor})
      .eq('id', params.id);

    setInputs({
      'title': '',
      'content': '',
      'imageUrl': ''
    });

    alert("Post is updated successfully!");

    fetchCrewmate().catch(console.error);
  };

  const deleteCrewmate = async () => {
    await supabase
      .from('crewmates')
      .delete()
      .eq('id', params.id);

    alert("Crewmate is deleted successfully!");
    navigate(`/gallery`, {replace: true});
  };

  return (
    <div className="edit-page">
      <h2>Update Your Post</h2>
      <form className="form-container">
      <input type="text" name="title" id="title" placeholder="Title" onChange={handleChange} value={inputs["title"]} />
        <textarea name="content" id="content" placeholder="Content (Optional)" rows="10">{inputs["content"]}</textarea>
        <input type="url" name="imageUrl" id="imageUrl" placeholder="Image URL (Optional)" onChange={handleChange} value={inputs["imageUrl"]} />
      </form>
      <button type="submit" onClick={updatePost}>Update Crewmate</button>
      <button className="delete-button" type="button" onClick={deleteCrewmate}>Delete Crewmate</button>
    </div>
  );
};

export default EditPage;