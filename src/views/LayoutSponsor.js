import React from 'react';
import { useHistory } from 'react-router';

import {Dashboard as DashboardIon, AccountCircle} from '@material-ui/icons'

import Layout from '../components/Layout'

export const LayoutSponsor = ({children, pageTitle}) => {
  const history = useHistory()

  const list = [
    {
      icon: <DashboardIon color='primary' />,
      title: "Dashboard",
      onClick: () => history.push('/sponsor')
    },
    {
      icon: <AccountCircle color='primary' />,
      title: "Profile",
      onClick: () => history.push('/sponsor-profile')
    }
  ]
  return <Layout pageTitle={pageTitle} list={list}>{children}</Layout>
}
