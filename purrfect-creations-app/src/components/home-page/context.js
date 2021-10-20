import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

export const HomePageContext = createContext(null);

export default function Context({ children, ...props }) {
    return (
      <HomePageContext.Provider value={{ ...props }}>
        {children}
      </HomePageContext.Provider>
    );
  }

  Context.propTypes = {
    children: PropTypes.node.isRequired,
  }

  export const useHomePage = () => useContext(HomePageContext);