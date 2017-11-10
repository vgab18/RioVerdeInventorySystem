import React from 'react';
import ReactDOM from 'react-dom';
import './Style/index.css';
import App from './App';
import {
    Route,
    Switch
} from 'react-router-dom';
import routes  from './routes';
import {ConnectedRouter} from 'react-router-redux';
import configureStore from './stores/configureStore';
import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import {registerStore} from './utils/RestClient';
import registerServiceWorker from './registerServiceWorker';
import queryString  from 'query-string';
import Login from './containers/Login';



const initialState = {

};


const history = createHistory();

function addLocationQuery(history){
    history.location = Object.assign(
        history.location,
        {
            query: queryString.parse(history.location.search)
        }
    )
}

addLocationQuery(history);

history.listen(() => {
    addLocationQuery(history)
});


const store = configureStore(initialState,history);

registerStore(store);

const Component=(
  <Provider store={store}>
  <MuiThemeProvider>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={history}>
              <div>
              {routes}
              </div>
      </ConnectedRouter>
      </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(Component,document.getElementById('root'));
registerServiceWorker();
