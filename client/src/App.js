import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import MainRouter from './MainRouter';
import { Provider } from 'react-redux';
import store from "./redux/store";


const App = () =>  {

    return (
      <Provider store={store}>
        <Router>
          <MainRouter></MainRouter>
        </Router>
      </Provider>
    );
};


export default App;

