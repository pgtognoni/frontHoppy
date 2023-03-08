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
        breakpoint={4000}
        maxWidth="180px"
        toggled={toggle}
        onMouseLeave={onMouseLeave}
        className="text-black" id="CDBSSide">
        <CDBSidebarHeader 
          onMouseEnter={onMouseHover}
          prefix={<i className='fa fa-large text-black fa-bars'></i>}>
          <a href="/" className="text-decoration-none sideText" style={{ color: "inherit" }}
          >
            Browse 
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu >
              <CDBSidebarMenuItem iconClassName="sideIcons text-black" icon="columns"><p className="sideText text-black">Images</p></CDBSidebarMenuItem>
              <CDBSidebarMenuItem iconClassName="sideIcons text-black" icon="table"><p className="sideText text-black">Videos</p></CDBSidebarMenuItem>
              <CDBSidebarMenuItem iconClassName="sideIcons text-black" icon="user"><p className="sideText text-black">Memes</p></CDBSidebarMenuItem>
              <CDBSidebarMenuItem iconClassName="sideIcons text-black" icon="chart-line"><p className="sideText text-black">Lifestyle</p></CDBSidebarMenuItem>            
              <CDBSidebarMenuItem iconClassName="sideIcons text-black" icon="columns"><p className="sideText text-black">Education</p></CDBSidebarMenuItem>
              <CDBSidebarMenuItem iconClassName="sideIcons text-black" icon="table"><p className="sideText text-black">Gaming</p></CDBSidebarMenuItem>
              <CDBSidebarMenuItem iconClassName="sideIcons text-black" icon="user"><p className="sideText text-black">Food</p></CDBSidebarMenuItem>
              <CDBSidebarMenuItem iconClassName="sideIcons text-black" icon="chart-line"><p className="sideText text-black">Business</p></CDBSidebarMenuItem>            
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
