import React from "react";
import PropTypes from "prop-types";
import { Form } from "reactstrap";
import { GenericInput } from "./Input";

// Getting different kinds of props from the parent component
// makes this Form component a HIGHLY REUSABLE COMPONENT which
// can be used as any kind of a button anywhere in the APP

export const GenericForm = ({spec, formValue}) => {
    return (
        <Form>
            {
                spec.inputSpecs.map((inputSpec) => (
                    <GenericInput key={inputSpec.id} value={formValue[inputSpec.id]} {...inputSpec}/>
                ))
            }
        </Form>
    );
}

GenericForm.propTypes = {
    spec: PropTypes.object,
    formValue: PropTypes.object
};
