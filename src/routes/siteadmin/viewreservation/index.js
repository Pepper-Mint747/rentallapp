import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import ViewReservationroute from './ViewReservationroute';
import { restrictUrls } from '../../../helpers/adminPrivileges';


// const title = 'Reservation Details';

export default {

    path: '/siteadmin/viewreservation/:id/:type',

    async action({ store, params }) {


        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;


        if (!isAdminAuthenticated) {
            return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/viewreservation/', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }
        const id=params.id;
        const type = params.type;
        let title = type == 'reservation' ? 'Reservation Details' : 'Payout Details'
        return {
            title,
            component: <AdminLayout><ViewReservationroute id={Number(id)} type={type}/></AdminLayout>,
        };
    },

};
