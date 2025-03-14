import React from 'react';
import { Link } from 'react-router-dom';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';


const NAVIGATION = [
   { kind: 'header', title: 'Main items' },
   {
      segment: 'home',
      title: 'Home',
      icon: <HomeIcon />,
      element: <Link to="/homE" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>,
   },
   {
      segment: 'book',
      title: 'Book Ticket',
      icon: <ConfirmationNumberIcon />,
      element: <Link to="/book" style={{ textDecoration: 'none', color: 'inherit' }}>Book Ticket</Link>,
   },
   
   {
      segment: 'ticketstatus',
      title: 'Ticket Status',
      icon: <PendingActionsIcon />,
      element: <Link to="/ticketstatus" style={{ textDecoration: 'none', color: 'inherit' }}>Ticket Status</Link>,
   },
   { kind: 'divider' },
   //{ kind: 'header', title: 'Analytics' },
   {
      segment: 'addbus',
      title: 'Add Bus',
      icon: <DirectionsBusIcon />,
      element: <Link to="/addbus" style={{ textDecoration: 'none', color: 'inherit' }}>Add Bus</Link>,
   },
   
];

export default NAVIGATION;
