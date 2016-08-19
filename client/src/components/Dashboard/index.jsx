import React from 'react';
import Drawer from 'material-ui/Drawer';

// Activate this dashboard by hitting an icon in upper-RH corner
const Dashboard = ({ open }) => (
  <Drawer
    openSecondary
    docked={false}
    open={open}
    onRequestChange={(open) => this.setState({open})}
  >
    <p>Item 1</p>
    <p>Item 2</p>
    <p>Item 3</p>
  </Drawer>
);

export default Dashboard;
