import React from "react";
import classnames from "classnames";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import PropTypes from "prop-types";

// Getting different kinds of props from the parent component
// makes this Tabs component a HIGHLY REUSABLE COMPONENT which
// can be used as any kind of a button anywhere in the APP

export const GenericTab = ({currentTab, tabContent, tabs, ...rest}) => {
    return (
        <>
            {
                tabs.length > 0 &&
                <Nav tabs>
                    {
                        tabs.map((tab, index) => (
                            <NavItem key={`tab-${index}`}>
                                <NavLink
                                    className={`${currentTab !== tab.label ? tab.className + " " : ""}${classnames({active: currentTab === tab.label})}`}
                                    onClick={() => tab.onClick(tab.label)}
                                >
                                    {tab.label}
                                </NavLink>
                            </NavItem>
                        ))
                    }
                </Nav>
            }
            {
                tabContent.length > 0 &&
                <TabContent activeTab={currentTab}>
                    {
                        tabContent.map((content, index) => (
                            <TabPane tabId={tabs[index].label} key={`tab-pane-${index}`}>
                                {content.children}
                            </TabPane>
                        ))
                    }
                </TabContent>
            }
        </>
    );
}

GenericTab.propTypes = {
    currentTab: PropTypes.string.isRequired,
    tabContent: PropTypes.arrayOf(PropTypes.object).isRequired,
    tabs: PropTypes.arrayOf(PropTypes.object).isRequired
};
