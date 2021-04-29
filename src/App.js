import { Switch, Route } from 'react-router-dom';
import React from 'react';
import MainView from './components/MainView';
import NavBar from './components/NavBar';
import About from './components/About';
import Footer from './components/Footer';
import Upload from './components/Upload';
import Contact from './components/Contact';
import Archive from './components/Archive';
import Login from './components/Login';
import BlogItem from './components/Archive';
import ProtectedRoute  from './components/AuthLogin';
import './App.css';

const App = () => {

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path='/' component={MainView} exact />
        <Route path='/about' component={About} />
        <Route path='/archive' component={Archive} />
        <Route path='/contact' component={Contact} />
        <ProtectedRoute path='/admin' component={Upload} />
        <Route path='/archive/:id' component={BlogItem} />
        <Route path='/login' component={Login} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
