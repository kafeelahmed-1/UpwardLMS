import './toggle.css';
import React, { useState } from 'react';

const Toggle = () =>
{
   /*  console.log('is checked prop :' , isChecked ); */
    const [ toggleState , setToggleState ] = useState();

    
 
    return(
        <>
        <label className="switch">
        <input type="checkbox"/>
        <span className="slider round"></span>
        </label>
        </>
    );
}

export default Toggle;