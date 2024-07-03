// App.tsx
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Posts from "./app/components/posts"; // Composant qui liste les articles
import PostDetail from "./app/components/PostDetail"; // Composant pour afficher les détails d'un article

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route path="/Post/:slug" components={PostDetail} />
      </Switch>
    </Router>
  );
}

export default App;
