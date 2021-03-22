import React from 'react';
import { useHistory } from 'react-router';

import {Dashboard as DashboardIon, AccountCircle, PeopleAlt as PeopleAltIcon} from '@material-ui/icons'

import Layout from '../components/Layout'

export const LayoutConnector = ({children, pageTitle}) => {
  const history = useHistory()

  const list = [
    {
      icon: <DashboardIon color='primary' />,
      title: "Dashboard",
      onClick: () => history.push('/connector')
    },
    {
      icon: <AccountCircle color='primary' />,
      title: "Profile",
      onClick: () => history.push('/connector-profile')
    },
    {
      icon: <PeopleAltIcon color='primary' />,
      title: "User List",
      onClick: () => history.push('/connector-user-list')
    }
  ]
  return <Layout pageTitle={pageTitle} list={list}>{children}</Layout>
}
