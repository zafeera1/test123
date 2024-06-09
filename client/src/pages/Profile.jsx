import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USER_PROFILE = gql`
  query Query {
    getUserProfile {
      createdRecipes {
        title
        instructions
        ingredients
        description
        id
        createdAt
      }
      savedRecipes {
        description
        id
        ingredients
        instructions
        title
        createdBy {
          username
        }
        createdAt
      }
      user {
        username
        id
      }
    }
  }
`;

const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE);
  const [profile, setProfile] = useState(null);
  const [activeSection, setActiveSection] = useState("saved");

  useEffect(() => {
    if (data) {
      console.log('Profile data fetched:', data);
      setProfile(data.getUserProfile);
    }
  }, [data]);

  const renderSection = () => {
    if (activeSection === "saved" && profile) {
      return profile.savedRecipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <h3>{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title} />
          <p>{recipe.instructions}</p>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      ));
    } else if (activeSection === "created" && profile) {
      return profile.createdRecipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <h3>{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title} />
          <p>{recipe.instructions}</p>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      ));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error loading profile:', error);
    return <p>Error loading profile</p>;
  }

  return (
    <div>
      <div className="profile-header">
        <h1 id="title">My Profile</h1>
        <button className="create-recipe-button">Create Recipe</button>
      </div>
      <div className="profile-tabs">
        <button
          className={`tab-button ${activeSection === "saved" ? "active" : ""}`}
          onClick={() => setActiveSection("saved")}
        >
          Saved Recipes
        </button>
        <button
          className={`tab-button ${activeSection === "created" ? "active" : ""}`}
          onClick={() => setActiveSection("created")}
        >
          Created Recipes
        </button>
      </div>
      <div className="profile-container">
        <div className="profile-content">{renderSection()}</div>
      </div>
    </div>
  );
};

export default Profile;
