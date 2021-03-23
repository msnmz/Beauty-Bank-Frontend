import React from 'react';

import {Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core'
import Pagination from "@material-ui/lab/Pagination";

export const List = ({list, tickets, pagination}) => 
  <>
    {pagination && 
    <Pagination
      count={pagination.pageSize}
      color="secondary"
      onChange={(_, page) => pagination.setPage(page)}
    />}
    <Table size="small">
      <TableHead>
        <TableRow>
          {
            list.headers.map(lh => (
              <TableCell key={lh}>{lh}</TableCell>
            ))
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {tickets?.map((ticket) => (
          <TableRow key={ticket.id}>
            {
              list.body.map(lb =>(
                <TableCell>{lb(ticket)}</TableCell>
              ))
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
