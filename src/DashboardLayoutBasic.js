import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import NAVIGATION from './navigation';
import demoTheme from './theme';

// Import Components
import Book from './components/Book';
import Home from './components/Home';
import Ticketstatus from './components/Ticketstatus';
import Addbus from './components/Addbus';
import Bookticket from './components/Bookticket';

function DashboardLayoutBasic(props) {
   const { window } = props;

   return (
      <Router>
         <AppProvider navigation={NAVIGATION} theme={demoTheme} window={window} branding={{
            logo: "",
            title: <span style={{ color: 'lightgreen', fontSize: '26px' }}>Bus Ticket Booking System</span>
         }} >
            <DashboardLayout >
               <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/book" element={<Book />} />
                  <Route path="/addbus" element={<Addbus />} />
                  <Route path="/ticketstatus" element={<Ticketstatus />} />
                  <Route path="/bookticket" element={<Bookticket />} />
               </Routes>
            </DashboardLayout>
         </AppProvider>
      </Router >
   );
}

DashboardLayoutBasic.propTypes = {
   window: PropTypes.func,
};

export default DashboardLayoutBasic;
