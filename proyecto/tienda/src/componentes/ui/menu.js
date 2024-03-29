import React from "react";
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import {useState} from 'react';
import { Link } from "react-router-dom";
import {useContext , createContext} from 'react';
import UserContext from '../../UserContext';


function MenuUI() {
  const [anchorEl, setAnchorEl] = useState(null);

  const contexto = useContext(UserContext);
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout=()=>{
    contexto.setUser('');
  }
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  let logout=<div></div>

  if(contexto.user!=''){
    logout=<Button onClick={handleLogout}>Logout</Button>
  }

    return (
        <div
        style={{
            marginLeft: "0%",
        }}
        >
        <Button
            onClick={handleClick}>
            Menu
        </Button>
        <Menu
            keepMounted
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}
        >
            <MenuItem onClick={handleClose}><Link to="/products" className="btn btn-primary">Productos</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/pedidos" className="btn btn-primary">Pedidos</Link></MenuItem>
        </Menu>
        {logout}
        </div>
    );
    };

export default MenuUI;