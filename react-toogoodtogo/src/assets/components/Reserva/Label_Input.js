import React, { useState } from "react";


function Label_Input({ id,atributo, tipo, textDefault }) {
    const [inputValue, setInputValue] = useState(textDefault);

    const handleFocus = () => {
        setInputValue('');
    };
    const handleChange = (e) => { /* Se ejecuta cada vez que cambia el valor del input */
        setInputValue(e.target.value);
    };

    return (
        <div className="cont-LabelInputs">
            <label className='labelDatosPersonales'>{atributo}</label>
            <input
                id={id}
                className='inputDatosPersonales'
                type={tipo}
                required
                value={inputValue}
                onFocus={handleFocus}
                onChange={handleChange}
            />
        </div>
    );
}
export default Label_Input;