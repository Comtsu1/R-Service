import {ResetForm} from './components/ResetForm';
import React, {useState} from 'react';


function Reset(){
    
      const Reset = details => {
        console.log(details);
    
        ///connect back-end
        ///look on ./components/ResetForm.js
        /// i need to get mail from backend there

      }
    
    
      return (
        <div className="ResetPassword">
          <ResetForm Reset = {Reset}/>
        </div>
      );
}



export {Reset};