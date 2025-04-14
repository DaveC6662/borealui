import { Button } from "boreal";

const App = () => (
  <div style={{ padding: 32 }}>
    <h1>UI Test</h1>
    <Button theme="primary" onClick={() => alert("hi")}>Test Button</Button>
  </div>
);

export default App;
