import React from 'react';
import { useState, useEffect } from "react";
import { LoginContext } from './context';
 
const App2=()=>{

  const [LoggedIn, setLoggedIn]= useState(false)
  return(
    <LoginContext.Provider value={{LoggedIn, setLoggedIn}}>
      testinggg
      <button>login</button>
      </LoginContext.Provider>



  )
}



export default App2; 

