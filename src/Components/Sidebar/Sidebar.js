//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiPlus, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { connect } from 'react-redux';

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";


//components
import SingleItem from "../../Components/Item/SingleItem";

import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {RoutesNames} from "../../routes/RoutesNames";
import { useFormik  } from 'formik';
const Sidebar = ({ lists }) => {

  //Search
  const searchFormik = useFormik({
    initialValues: {
      name: '',
    },
  });
  const filteredLists = lists && lists.filter((item) => (
    item.name.toLowerCase().includes(searchFormik.values.name.toLowerCase())
  ));

  return (
        <ProSidebar collapsed={false}>
          <SidebarHeader>
            <div id="seach"> 
              <input
                id="name"
                placeholder="Search......"
                name="name"
                type="text"
                onChange={searchFormik.handleChange}
                value={searchFormik.values.name}
              />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              {lists.length !== 0 ?
                filteredLists.length !== 0 ? filteredLists.map((item) => (
                  <MenuItem>
                    <SingleItem name={item.name} />
                    <Link to={`${RoutesNames.view.path}/${item.name}`} state={{id: item.id}} />
                  </MenuItem> 
                )) : <div className="d-flex align-items-center justify-content-center" style={{paddingLeft: "10px", paddingRight: "10px"}}>
                <Alert variant="info">
                  <Alert.Heading>No Match Found &nbsp;😊</Alert.Heading>
                </Alert>

              </div> : <div className="d-flex align-items-center justify-content-center">
                  <Alert variant="info">
                    <Alert.Heading>Hey, The list is empty &nbsp;😊</Alert.Heading>
                    <p>
                      When you will add new list, they will be displayed to here.
                    </p>
                  </Alert>

                </div>}

            </Menu>
          </SidebarContent>
        </ProSidebar>
  );
};

const mapStateToProps = state => {
  return {
    lists: state.listsData,
  };
};

export default connect(mapStateToProps)(Sidebar);