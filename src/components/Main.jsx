import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  const [recipe, setRecipe] = React.useState("");

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim();

    // Check if input is valid
    if (newIngredient.length < 2) {
      alert("Please type an ingredient with at least 2 letters.");
      return; // Stop further execution
    }

    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
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

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
