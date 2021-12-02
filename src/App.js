import './App.css';
import Header from './components/layout/Header';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import ClientDetails from './components/clients/ClientDetails';

import {Provider} from 'react-redux';
import store from './store';

import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import firebase from './firebase.config';
import { createFirestoreInstance } from 'redux-firestore';
import EditClient from './components/clients/EditClient';

const rrfProps = {
  firebase,
  config: {},
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <div className="App">
            <Header/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard}></Route>
                <Route exact path="/clients/add" component={AddClient}></Route>
                <Route exact path="/client/:id" component={ClientDetails}></Route>
                <Route exact path="/client/edit/:id" component={EditClient}></Route>
              </Switch>
            </div>
          </div>
        </Router>
    </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
