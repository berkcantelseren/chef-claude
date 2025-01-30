import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe(props) {
  return (
    <section
      id={props.id}
      className="suggested-recipe-container"
      arial-live="polite"
    >
      <h2>Robo Chef Recommends:</h2>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  );
}
