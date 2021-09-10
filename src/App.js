import Form from "./components/Form";
import List from "./components/List";
import Spiner from "./components/Spiner";
import Alert from "./components/Alert";
import { useEffect } from "react";
import { URL, pending, error, success } from "./URL";
import { changeStatus, get, getData } from "./reducer/listSlice";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const status = useSelector((state) => state.list.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData())
  }, []);

  if (status === pending) return <Spiner />;
  if (status === error) return <Alert />;
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact render={(props) => <List {...props} />} />
          <Route path='/services/:id' render={(props) => <Form {...props} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
