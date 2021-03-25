import React from 'react';

import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core'

const LayoutListItem = ({onClick, children, title}) => 
  <ListItem button onClick={onClick}>
    <ListItemIcon>
      {children}
    </ListItemIcon>
    <ListItemText primary={title} />
  </ListItem>

export default LayoutListItem