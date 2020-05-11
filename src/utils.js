import React from "react";
import { GenericButton } from "./components/Button";

export const colors = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    SUCCESS: "success",
    INFO: "info",
    DANGER: "danger"
};

export const inputTypes = {
    CHECKBOX: "checkbox",
    COLOR: "color",
    DATE: "date",
    DATE_TIME_LOCAL: "datetime-local",
    EMAIL: "email",
    FILE: "file",
    HIDDEN: "hidden",
    IMAGE: "image",
    NUMBER: "number",
    PASSWORD: "password",
    RADIO: "radio",
    RANGE: "range",
    TEXT: "text",
    TEXTAREA: "textarea",
    SELECT: "select",
};

export const taskStates = {
    OPEN: "open",
    COMPLETED: "completed"
};

export const priorityTypes =  {
    NONE:  "none",
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
};

export const groupTypes = {
    NONE: "none",
    CREATED_ON: "createdAt",
    PENDING_ON: "dueDate",
    PRIORITY: "priority",
};

export const modalModes = {
    NEW: "new",
    EDIT: "edit",
    READ_ONLY: "readonly",
    DELETE: "delete"
};

export const placeholders = {
    SEARCH: "Search Tasks",
    SUMMARY: "Summary",
    DESCRIPTION: "Description",
};

export const labels = {
    NONE: "None",
    CREATED_ON: "Created On",
    PENDING_ON: "Pending On",
    PRIORITY: "Priority",
    GROUP_BY: "Group By",
    SEARCH: "Search",
    TODO_APP: "ToDo App",
    ALL: "All",
    PENDING: "Pending",
    COMPLETED: "Completed",
    SUMMARY: "Summary",
    DUE_BY: "Due By",
    ACTIONS: "Actions",
    ADD_TASK: "Add Task",
    EDIT_TASK: "Edit Task",
    DESCRIPTION: "Description",
    DUE_DATE: "Due Date",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    CLOSE: "Close",
    SAVE: "Save",
    DONE: "Done",
    REOPEN: "Re-Open",
    YES: "Yes",
    NO: "No",
    CONFIRM_DELETE: "Are you sure you want to delete this task?"
};

export const generateId = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const getTabs = (labels, className, onClick) => {
    return labels.map((label) => ({
        label,
        className,
        onClick
    }))
};

export const getHeaderItem =  (label, useButton, icon, onClick) => {
    return {
        label,
        useButton,
        icon,
        onClick
    }
};

export const getSelectOption = (value, label) => {
    return {
        value,
        label
    };
};

export const getTableRow = (item, index) => {
    const {dataItem} = item;
    return (
        <tr key={index}>
            {
                <>
                    {
                        Object.values(dataItem).map((value, ind) => (
                            <td onClick={item.onClick} key={ind}>
                                {
                                    item.strikeThrough ?
                                    <del>{value}</del> : value
                                }
                            </td>
                        ))
                    }
                    { item.buttons &&
                        <td>
                            {item.buttons.map((button, index) => {
                                return (
                                    <span key={index} className="mr-2">
                                        <GenericButton {...button}/>
                                    </span>
                                );
                            })}
                        </td>
                    }
                </>
            }
        </tr>
    );
};

export const getButtonSpec = (color, onClick, icon, label, className, size, style, iconSize, iconStyle) => {
    return {
        label,
        color,
        className,
        icon,
        iconSize,
        iconStyle,
        onClick,
        size,
        style
    };
};

export const getInputSpec = (id, name, type, label, onChange, options, placeholder, className, labelClassName, readonly, minLength, maxLength, style, labelStyle) => {
    return {
        name,
        id,
        type,
        label,
        options,
        className,
        labelClassName,
        minLength,
        maxLength,
        style,
        labelStyle,
        onChange,
        placeholder,
        readonly
    }
};
