import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import BecomeHostStaticBlock from './BecomeHostStaticBlock';
import { getStaticBlockInfo } from '../../../actions/siteadmin/getStaticBlockInfo';
import { restrictUrls } from '../../../helpers/adminPrivileges';

const title = 'Become Host Static Block';

export default {

  path: '/siteadmin/static-block',

  async action({ store, dispatch }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

    // await store.dispatch(getStaticBlockInfo())

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    // // Admin restriction
    if (!restrictUrls('/siteadmin/static-block', adminPrivileges)) {
      return { redirect: '/siteadmin' };
    }

    return {
      title,
      component: <AdminLayout><BecomeHostStaticBlock title={title} /></AdminLayout>,
    };
  },

};
