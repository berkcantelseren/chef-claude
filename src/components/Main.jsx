export default function Main() {
  return (
    <main>
      <form className="ingredient-form">
        <input
          aria-label="Add ingredient"
          type="text"
          placeholder="e.g. Paprika"
        />
        <button>Add ingredient</button>
      </form>
    </main>
  );
}
