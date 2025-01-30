import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function getRecipe() {
    setLoading(true);
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
    setLoading(false);

    setTimeout(() => {
      const recipeSection = document.getElementById("recipe-section");
      if (recipeSection) {
        recipeSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim();

    if (newIngredient.length < 2) {
      setErrorMessage("Please type an ingredient with at least 2 letters.");
      setIsErrorVisible(true);
      setTimeout(() => {
        setIsErrorVisible(false);
      }, 2000);
      return;
    }

    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    setErrorMessage("");
    setIsErrorVisible(false);
  }

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          addIngredient(formData);
          e.target.reset();
        }}
        className="ingredient-form"
      >
        {errorMessage && (
          <div className={`error-message ${!isErrorVisible ? "hidden" : ""}`}>
            {errorMessage}
          </div>
        )}

        <input
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. Paprika"
          name="ingredient"
          autoComplete="off"
        />
        <button>Add ingredient</button>
      </form>
      <p className="tip">( Add 4 or more ingredients to create a recipe )</p>
      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}

      {loading && <p className="loading">Loading...</p>}

      {recipe && <ClaudeRecipe id="recipe-section" recipe={recipe} />}
    </main>
  );
}
