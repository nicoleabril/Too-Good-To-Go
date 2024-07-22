import React from "react";

function Label_Input({ id, atributo, tipo, textDefault, value, onChange }) {
    return (
        <div className="cont-LabelInputs">
            <label className='labelDatosPersonales' htmlFor={id}>{atributo}</label>
            <input
                id={id}
                className='inputDatosPersonales'
                type={tipo}
                placeholder={textDefault}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
}

export default Label_Input;
