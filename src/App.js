import { Route, Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/">
        {/*landing page component*/}
      </Route>
      <Route path="/some_other_route">
        {/*Some other component goes here*/}
      </Route>
    </Router>
  );
}

export default App;
