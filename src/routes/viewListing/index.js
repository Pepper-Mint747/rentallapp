import React from 'react';
import Layout from '../../components/Layout';
import ViewListing from './ViewListing';
import NotFound from '../notFound/NotFound';
import fetch from '../../core/fetch';
import { url, fileuploadDir } from '../../config.js';
import moment from 'moment';
import { getSpecialPricingData } from '../../actions/Listing/getSpecialPricingData';
import { checkAvailability } from '../../actions/checkAvailability';

const title = 'View Listing';

function renderNotFound() {
  return {
    title,
    component: <Layout><NotFound title={title} /></Layout>,
    status: 404,
  };
}

export default {

  path: '/rooms/:listId/:preview?',

  async action({ params, store, query }) {


    let listTitle, listDescription, listPhoto, lat, lng, startDate, endDate, guests;
    const baseCurrency = store.getState().currency.base;
    const getListquery = `
      query GetListMeta($listId: Int!) {
        getListMeta(listId: $listId) {
          id
          title
          description
          isPublished
          listPhotos {
            id
            name
          }
          status
          lat
          lng
          listingData {
            maxNight
            minNight
          }

        }
      }
    `;

    // From URI
    let listURL = params.listId;
    let listId, listURLData;
    let preview = false;
    let maximumNights = 0, minimumNights = 0;
    if (params.preview) {
      preview = true;
    }

    if (listURL && listURL.indexOf('-') >= 0) {
      listURLData = listURL.split('-');
      listId = listURLData[listURLData.length - 1];
    } else {
      listId = listURL;
    }

    if (listId === undefined || isNaN(listId)) {
      renderNotFound();
      return;
    }

    // const dates = params.dates;
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: getListquery,
        variables: { listId }
      }),
    });
    const { data } = await resp.json();
    
    if ('startdate' in query && 'enddate' in query) {
      let today = moment(new Date()).format("YYYY-MM-DD");
      startDate = moment(query.startdate).format("YYYY-MM-DD");
      endDate = moment(query.enddate).format("YYYY-MM-DD");
      let checkValidDate = false;
      if ((startDate < today) || endDate < today) {
        checkValidDate = true;
      } else if(startDate == endDate) {
        checkValidDate = true;
      } else if(startDate > endDate) {
        checkValidDate = true;
      } else if((moment(startDate).isValid() == false) || (moment(endDate).isValid() == false)) {
        checkValidDate = true;
      }

      if(checkValidDate) {
        query.startdate = null;
        query.enddate = null;
      }

      startDate = query.startdate;
      endDate = query.enddate;
      // store.dispatch(change("BookingForm","startDate",startDate));
      // store.dispatch(change("BookingForm","endDate",endDate));
      maximumNights = data && data.getListMeta && data.getListMeta.listingData && data.getListMeta.listingData.maxNight ? data.getListMeta.listingData.maxNight : 0;
      minimumNights =  data && data.getListMeta && data.getListMeta.listingData && data.getListMeta.listingData.minNight ? data.getListMeta.listingData.minNight : 0;

      await store.dispatch(getSpecialPricingData(listId, moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD')));
      await store.dispatch(checkAvailability(listId, moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'), maximumNights, minimumNights));

    }

    if('guests' in query){
      guests = query.guests
    }

    if (data && data.getListMeta) {
      if (!data.getListMeta.isPublished && !preview) {
        renderNotFound();
        return;
      }
      listTitle = data.getListMeta.title;
      listDescription = data.getListMeta.description;
      lat = data.getListMeta.lat;
      lng = data.getListMeta.lng;
      if (data.getListMeta.listPhotos && data.getListMeta.listPhotos.length > 0) {
        listPhoto = url + '/' + fileuploadDir + data.getListMeta.listPhotos[0].name;
      }
    } else {
      renderNotFound();
      return;
    }
    
    return {
      title: listTitle || title,
      description: listDescription || '',
      image: listPhoto || '',
      component: <Layout><ViewListing
        title={title}
        preview={preview}
        lat={lat}
        lng={lng}
        listId={Number(listId)}
        startDate={startDate}
        endDate={endDate}
        baseCurrency={baseCurrency}
        guests={guests}
      />
      </Layout>,
    };
  },

};
