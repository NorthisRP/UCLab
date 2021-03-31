import Header from "./Components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./Pages/About";
import Landing from "./Pages/Landing";
import Blog from "./Pages/Blog";
import Projects from "./Pages/Projects";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/blog" component={Blog} />
          <Route path="/about" component={About} />
          <Route path="/projects" component={Projects} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
