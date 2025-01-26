import React from "react";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);

  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function handleSubmit(event) {
    event.preventDefault();
    const formInputs = new FormData(event.currentTarget);
    const newIngredient = formInputs.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="ingredient-form">
        <input
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. Paprika"
          name="ingredient"
          autocomplete="off"
        />
        <button>Add ingredient</button>
      </form>

      <ul>{ingredientsListItems}</ul>
    </main>
  );
}
