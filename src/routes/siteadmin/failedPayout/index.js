import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import FailedPayout from './FailedPayout';

const title = 'Failed Payout';

export default {
    path: '/siteadmin/failed-payout/:id',

    async action({ store, params }) {

        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

        if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
        }

        if (!restrictUrls('/siteadmin/failed-payout/', adminPrivileges)) {
            return { redirect: '/siteadmin' };
        }
        
        const id = params.id;
        return {
            title,
            component: <AdminLayout><FailedPayout title={title} id={Number(id)}/></AdminLayout>
        }
    }
}