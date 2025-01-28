import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([
    "all the main spices",
    "pasta",
    "ground beef",
    "tomato paste",
  ]);

  const [recipeShown, setRecipeShown] = React.useState(false);

  function toggleRecipeShown() {
    setRecipeShown((prevShown) => !prevShown);
  }

  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
      <form action={addIngredient} className="ingredient-form">
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
      {ingredients.length > 0 && <IngredientsList />}

      {recipeShown && <ClaudeRecipe />}
    </main>
  );
}
