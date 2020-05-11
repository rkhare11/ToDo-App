import React from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";
import { GenericButton } from "./Button";
import { getTableRow, colors } from "../utils";


// Getting different kinds of props from the parent component
// makes this Table component a HIGHLY REUSABLE COMPONENT which
// can be used as any kind of a button anywhere in the APP

export const GenericTable = ({bodyItems, bordered, boldHeaders, borderless, groupBy, headerItems, hover, striped,...rest}) => {
    return (
        <Table bordered={bordered} striped={striped} borderless={borderless} hover={hover}>
            {
                // Not checking for undefined as the headerItems prop is marked as a required prop for the component
                 headerItems.length > 0 &&
                <thead>
                    {
                        <tr>
                        {
                            headerItems.map((item) => (
                                <th key={item.label} className="p-0 align-middle">
                                    <span className={`${boldHeaders ? "" : "font-weight-normal"}`}>{item.label}</span>
                                    {item.useButton && <span className="float-right"><GenericButton className="header-btn" size="sm" color={colors.PRIMARY} icon={item.icon} onClick={item.onClick}/></span>}
                                </th>
                            ))
                        }
                        </tr>
                    }
                </thead>
            }
            {
                // Not checking for undefined as the bodyItems prop is marked as a required prop for the component
                bodyItems.length > 0 &&
                <tbody>
                    {
                        bodyItems.map((group, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {group.label && group.items.length > 0 && <tr className="font-weight-bold" key={index}><td colSpan={headerItems.length}><u>{group.label.toUpperCase()}</u></td></tr>}
                                    {
                                        group.items.map((item, index) => {
                                            return getTableRow(item, index)
                                        })
                                    }
                                </React.Fragment>
                            );
                        })
                    }
                </tbody>
            }
        </Table>
    );
}

GenericTable.propTypes = {
    bodyItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    bordered: PropTypes.bool,
    borderless: PropTypes.bool,
    groupBy: PropTypes.string.isRequired,
    headerItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    hover: PropTypes.bool,
    striped: PropTypes.bool,
    boldHeaderes: PropTypes.bool
};
