import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import { restrictUrls } from '../../../helpers/adminPrivileges';
import PayoutManagement from './PayoutManagement';

const title = 'Payout Management';

export default {
    
    path: '/siteadmin/payout',

    async action({ store }) {

        // From Redux Store
        let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
        let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

        if (!isAdminAuthenticated) {
        return { redirect: '/siteadmin/login' };
        }

        // Admin restriction
        if (!restrictUrls('/siteadmin/payout', adminPrivileges)) {
        return { redirect: '/siteadmin' };
        }

        return {
            title,
            component: <AdminLayout><PayoutManagement title={title}/></AdminLayout>
        }
    }
}