import { useState } from "react";
import DataFetcher from "./components/DataFetcher";

function App() {
  const [postId, setPostId] = useState(1);

  const handleNext = () => {
    setPostId((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>React DataFetcher з axios</h1>

      <button onClick={handleNext} style={{ marginBottom: "20px" }}>
        Завантажити наступний пост
      </button>

      <DataFetcher url="https://jsonplaceholder.typicode.com/posts" id={postId} />
    </div>
  );
}

export default App;
