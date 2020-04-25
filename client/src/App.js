import React from 'react';
import logo from './logo.svg';
import './App.css';

// Material-UI imports
import Drawer from '@material-ui/Drawer';
import MenuItem from '@material-ui/MenuItem';
import RaisedButton from '@material-ui/RaisedButton';

var toggleSidebar = () => {
  this.state.open = !this.state.open;
}

function App() {
  return (
    <div className="App">
      <RaisedButton
        label="Toggle Drawer"
        onClick={this.toggleSidebar}
      />
      <Drawer open={this.state.open}>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    </div>
  );
}

export default App;
