import React, { useState, useEffect } from "react";
import Footer from "../constants/Footer";

function CreateRecipe() {

    const [info, setInfo] = useState({
        title: '',
        summary: '',
        servings: '',
        readyInMinutes: '',
        image: '',
        _id: ''
    });

    const createRecipe = async () => {        
        console.log('Creating recipe w info:', info)

        const formData = new FormData();
        formData.append('title', info.title);
        formData.append('summary', info.summary);
        formData.append('servings', info.servings);
        formData.append('readyInMinutes', info.readyInMinutes);
        formData.append('image', info.image); // Assuming 'info.image' is the file object
        
        fetch(`/create-recipe`, {
            method: 'POST',
            body: formData
            }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log('response status:', response.status);
                return response.json();    
            }
        }).then(data => {
            console.log('response data:', data);
        }).catch(error => {
            console.error('error creating recipe:', error);
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRecipe()
        } catch (error) {
            console.error("Failed to create recipe:", error);
        }
    }

    useEffect(() => {
        console.log("File was set")
    },[info]);

  return (
    <div>
      <div className="CreateRecipePage">
        <div className="createTitle">
            <h1>Create a Recipe</h1>
        </div>
        
            <ul>
                
                <div className="createRecipeCard">
                    <h3>Create your recipe here</h3>
                    <form onSubmit={handleSubmit} className="card card-body">
                        <div className="my-1">
                            <input 
                                
                                type="text"
                                value ={info.title}
                                onChange={(e) => setInfo({ ...info, title: e.target.value})}
                                className="form-control"
                                placeholder="Title"
                            >
                            </input>
                        </div>
                        <div className="my-1">
                        <input 
                                type="text"
                                value ={info.summary}
                                onChange={(e) => setInfo({ ...info, summary: e.target.value})}
                                className="form-control"
                                placeholder="Summary"
                            >
                            </input>
                        </div>
                        <div className="my-1">
                        <input 
                                type="text"
                                value ={info.servings}
                                onChange={(e) => setInfo({ ...info, servings: e.target.value})}
                                className="form-control"
                                placeholder="Servings (e.g. 4)"
                            >
                            </input>
                        </div>
                        <div className="my-1">
                        <input 
                                type="text"
                                value ={info.readyInMinutes}
                                onChange={(e) => setInfo({ ...info, readyInMinutes: e.target.value})}
                                className="form-control"
                                placeholder="Total cook time (min.)"
                            >
                            </input>
                        </div>
                        <div className=" my-1 imageInput">
                        <input 
                                type="file"
                                accept="image/*"
                                onChange={(e) => setInfo({ ...info, image: e.target.files[0] })}
                                className="form-control"
                                placeholder="Upload image"
                            >
                            </input>
                        </div>
                        <button type="submit" className="btn btn-primary createRecipeButton">
                            Create
                        </button>
                    </form>
                </div>
            </ul>
        
      </div>
      <Footer />
    </div>
  );
}

export default CreateRecipe;
