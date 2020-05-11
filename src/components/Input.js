import React from "react";
import { Input, Label } from "reactstrap";
import PropTypes from "prop-types";
import { inputTypes } from "../utils";

// Getting different kinds of props from the parent component
// makes this Input component a HIGHLY REUSABLE COMPONENT which
// can be used as any kind of a button anywhere in the APP

export const GenericInput = ({
    className,
    id,
    label,
    labelClassName,
    labelStyle,
    minLength,
    maxLength,
    name,
    onChange,
    options,
    placeholder,
    readonly,
    style,
    type,
    value,
    ...rest
}) => {

    return (
        <>
            {label && <Label className={labelClassName} htmlFor={name} style={labelStyle}>{label}</Label>}
            {
                type === inputTypes.SELECT ?
                <Input
                    type={type}
                    className={className}
                    style={style}
                    value={value}
                    id={id}
                    name={name}
                    onChange={(evt) => onChange(id, evt)}
                    disabled={readonly}
                >
                    {
                        options && options.length > 0 &&
                        options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))
                    }
                </Input> :
                <Input
                    className={className}
                    minLength={minLength}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    type={type}
                    style={style}
                    value={value}
                    id={id}
                    name={name}
                    onChange={(evt) => onChange(id, evt)}
                    readOnly={readonly}
                />
            }
        </>
    );

}

GenericInput.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    labelStyle: PropTypes.object,
    labelClassName: PropTypes.string,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object),
    placeholder: PropTypes.string,
    readonly: PropTypes.bool,
    style: PropTypes.object,
    type: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
};
