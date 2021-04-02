import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core';
// import CollectorDashboard from '../src/views/CollectorDashboard';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { ROLL_NUMBER } from '../src/utils/constants';
// import Footer from './components/Footer';
import Header from './components/Header';
import GridPanelSelection from './components/GridPanelSelection';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './reducers/RootReducer';

const store = createStore(
  rootReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const useStyles = makeStyles((theme) => ({
  mainBackground: {
    margin: '0px',
    // background: theme.palette.primary.main,
    background: `transparent radial-gradient(closest-side at 50% 50%, #58687E 0%, #39495E 100%) 0% 0% no-repeat padding-box`,
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    opacity: '1',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
}));
const App = () => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <div className={classes.mainBackground}>
        <Header />
        <GridPanelSelection />
        {/* <Router basename={`/${ROLL_NUMBER}`}>
        <Route exact path='/' component={CollectorDashboard} />
      </Router> */}
        {/* <Footer /> */}
      </div>
    </Provider>
  );
};

export default App;
