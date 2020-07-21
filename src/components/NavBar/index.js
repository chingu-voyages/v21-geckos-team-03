import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import { StyledNavbar } from './styles';

function NavBar() {
  const { user, firebase } = useContext(FirebaseContext);
  console.log(user);
  return (
    <StyledNavbar>
      <NavLink to="/">Movie Search</NavLink>
      {user ? (
        <>
          <div>{user.displayName}</div>
          <div>|</div>
          <button type="submit" onClick={() => firebase.logout()}>
            logout
          </button>
        </>
      ) : (
        <NavLink to="/login" className="header-link">
          login
        </NavLink>
      )}
    </StyledNavbar>
  );
}

export default NavBar;
