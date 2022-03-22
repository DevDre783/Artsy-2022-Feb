import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProfileDisplay from './components/ProfilePage';
import Footer from './components/Footer';
import BrowseListings from './components/BrowseListings'
import ListingFormPage from './components/ListingFormPage';
import ListingDetailsPage from './components/ListingDetailsPage'
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation />
      <Footer />
      <Switch>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <ProtectedRoute path='/my-profile' exact={true}>
          <ProfileDisplay />
        </ProtectedRoute>
        <ProtectedRoute path="/browse" exact={true}>
          <BrowseListings />
        </ProtectedRoute>
        <ProtectedRoute path="/listing-form" exact={true}>
          <ListingFormPage />
        </ProtectedRoute>
        <ProtectedRoute path="/browse/:listingId" exact={true}>
          <ListingDetailsPage />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path='/' exact={true} >
          <h1 style={{marginTop: "18%", marginLeft: "38%", fontSize: "50pt"}}>404: Page Not Found</h1>
          <img style={{marginLeft: "43%", marginTop: "2%"}} src="https://www.computerhope.com/jargon/e/error.png"></img>
        </ProtectedRoute>
        <Route>
          <h1 style={{marginTop: "18%", marginLeft: "38%", fontSize: "50pt"}}>404: Page Not Found</h1>
          <img style={{marginLeft: "43%", marginTop: "2%"}} src="https://www.computerhope.com/jargon/e/error.png"></img>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
