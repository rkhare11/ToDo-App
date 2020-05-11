import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";

// Getting different kinds of props from the parent component
// makes this Button component a HIGHLY REUSABLE COMPONENT which
// can be used as any kind of a button anywhere in the APP
 
export const GenericButton = ({color, className, icon, iconSize, iconStyle, label, onClick, size, style, ...rest}) => {
    return (
        <Button size={size} className={className} style={style} color={color} onClick={onClick}>
            {
                icon && <FontAwesome size={iconSize} style={iconStyle} name={icon}/>
            }
            {
                label
            }
        </Button>
    );
}

GenericButton.propTypes = {
    icon: PropTypes.string,
    size: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
    color: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    iconStyle: PropTypes.object,
    iconSize: PropTypes.string
};
