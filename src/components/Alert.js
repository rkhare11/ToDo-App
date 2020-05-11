import React from "react";
import { Alert } from "reactstrap";
import { colors } from "../utils";
import PropTypes from "prop-types";

export const GenericAlert = ({alerts}) => {
    return alerts.map((alert) => (
        <Alert key={alert} color={colors.DANGER}>{alert}</Alert>
    ));
};

GenericAlert.propTypes = {
    alerts: PropTypes.arrayOf(PropTypes.string).isRequired
}