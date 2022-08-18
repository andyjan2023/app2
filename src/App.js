import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";
import Translate from "./components/Translate";
import Route from './Route';

const App=()=>{
const items=[{title:"WhatisReact?",content:"Reactisafrontendjavascriptframework",},{title:"WhyuseReact?",content:"ReactisafavoriteJSlibraryamongengineers",},
{title:"HowdoyouuseReact?",content:"YouuseReactbycreatingcomponents",},];
const options=[{label:"TheColorRed",value:"red",},{label:"TheColorGreen",value:"green",},{label:"AShadeofBlue",value:"blue",},];
const [selected,setSelected]=useState(options[0]);

return (
  <div>
    <Route path="/">
      <Accordion items={items} />
    </Route>
    <Route path="/list">
      <Search />
    </Route>
    <Route path="/dropdown">
      <Dropdown
        label="Select a color"
        options={options}
        selected={selected}
        onSelectedChange={setSelected}
      />
    </Route>
    <Route path="/translate">
      <Translate />
    </Route>
  </div>
);}

export default App;


