export default function Main() {
  const ingredients = ["Chicken", "Tomatoes", "Cucember"];

  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function handleSubmit(event) {
    event.preventDefault();
    const formInputs = new FormData(event.currentTarget);
    const newIngredient = formInputs.get("ingredient");
    console.log(newIngredient);
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="ingredient-form">
        <input
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. Paprika"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>

      <ul>{ingredientsListItems}</ul>
    </main>
  );
}
