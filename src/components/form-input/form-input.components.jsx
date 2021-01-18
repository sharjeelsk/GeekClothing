import React from 'react'

import "./form-input.styles.scss"


const FormInput = ({handleChange, label,value,...otherProps}) => {
    return (
       <div className="group">
              {
               label?
               (<label className={`${value.length? 'shrink':''} from-input-label`}>
                   {label}
               </label>):null
           }
           <input className="form-input" onChange={handleChange} {...otherProps} />
        
       </div> 
    );
}

export default FormInput;