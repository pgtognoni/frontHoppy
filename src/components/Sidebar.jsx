import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [toggle, setToggle] = useState(true);

    function onMouseLeave () {        
        setToggle(true)        
    };
    function onMouseHover () {
        setToggle(false)
        
    };
    


  return (
    <div className ="mainSide text-black">
    <div className ="subSide sideSub" >
    
      <CDBSidebar
      onMouseEnter={onMouseHover}
      onMouseLeave={onMouseLeave}
      toggled={toggle}
      className="text-black" id="CDBSSide">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large text-black"></i>}>
          <a
            href="/"
            className="text-decoration-none sideText"
            style={{ color: "inherit" }}
          >
            Sidebar
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu >
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem iconClassName="sideIcons text-black" icon="columns"><p className="sideText text-black">Memes</p></CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked">
              <CDBSidebarMenuItem iconClassName="sideIcons text-black" icon="table"><p className="sideText text-black">Memes</p></CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem iconClassName="sideIcons text-black" icon="user"><p className="sideText text-black">Memes</p></CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem iconClassName="sideIcons text-black" icon="chart-line">
              <p className="sideText text-black">Memes</p>
              </CDBSidebarMenuItem>
            </NavLink>
            
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div>
           //icon goes here
          </div>
        </CDBSidebarFooter>
      </CDBSidebar> 
      </div>
    </div>
  );
};


export default Sidebar;
