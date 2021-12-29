import React from 'react';
import Layout from '../../components/Layout';
import Book from './Book';
import NotFound from '../notFound/NotFound';

import { getRedirectURL } from '../../helpers/formatURL';

const title = 'Booking';

export default {

  path: '/book/:hostingId',

  action({ store, params }) {

    // From Redux Store
    let isAuthenticated = store.getState().runtime.isAuthenticated;
    let bookingData = store.getState().book.data;
    let hostingId = params.hostingId;
    let bookDetails = store.getState().book.bookDetails;

    // Check authentication
    if (!isAuthenticated) {
      let urlParameters = {};
      if (bookDetails && bookingData)
        urlParameters = { startDate: bookDetails.startDate, endDate: bookDetails.endDate, guests: bookDetails.guests, listTitle: bookingData.title };
      let redirect = getRedirectURL(hostingId, urlParameters)
      return { redirect };
    }

    // Check listId is provided
    if (!hostingId) {
      return {
        title,
        component: <Layout><NotFound title={title} /></Layout>,
        status: 404
      };
    }

    // Check redux store for booking data
    if (!bookingData) {
      return { redirect: '/rooms/' + hostingId };
    }

    return {
      title,
      component: <Layout><Book title={title} /></Layout>,
    };
  },

};