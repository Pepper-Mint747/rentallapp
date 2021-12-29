import React from 'react';
import AdminLayout from '../../../components/Layout/AdminLayout';
import AdminRoles from './AdminRoles';

const title = 'Manage Admin Roles';

export default {

  path: '/siteadmin/admin-roles',

  async action({ store }) {

    // From Redux Store
    let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    let isSuperAdmin = store.getState().runtime.isSuperAdmin;

    if (!isAdminAuthenticated) {
      return { redirect: '/siteadmin/login' };
    }

    if (!isSuperAdmin) {
      return { redirect: '/siteadmin/login' };
    }

    return {
      title,
      component: <AdminLayout><AdminRoles title={title} /></AdminLayout>,
    };
  },

};
