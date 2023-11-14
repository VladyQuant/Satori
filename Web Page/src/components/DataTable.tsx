import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

interface DataTableProps {
  columns: Array<string>,
  data: Array<Transaction>
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  const filters = useSelector((state: RootStateOrAny) => state.filtersReducer);

  const shouldDisplay = (transaction: Transaction) => {
    let current_date = new Date();
    let effective_date = new Date(transaction.effective_date);
    let expiration_date = new Date(transaction.expiration_date);

    let matchesSearchText = filters.searchText === '' ? 
      true : transaction.account_name.toLowerCase().includes(filters.searchText.toLowerCase());
    let matchesStatus = filters.statuses.length > 0 ? 
      filters.statuses.some((status: string) => status == transaction.status) : true;
    let matchesCoverageLines = filters.coverage_lines.length > 0 ? 
      filters.coverage_lines.some((coverage_line: string) => transaction.coverage_lines.includes(coverage_line)) : true;
    
    let matchesDealStages = true;
    if (filters.deal_stages.indexOf("Effective") > -1) {
      if (!(current_date >= effective_date && current_date < expiration_date)) {
        matchesDealStages = false;
      }
    }
    if (filters.deal_stages.indexOf("Expired") > -1) {
      matchesDealStages = (current_date > expiration_date) ? true: false 
    }

    let matchesUW = filters.uw_names.length > 0 ? 
      filters.uw_names.some((uw_name: string) => uw_name == transaction.uw_name) : true;

    let res = matchesSearchText && matchesStatus && matchesCoverageLines 
      && matchesDealStages && matchesUW;
    // console.log(matchesSearchText);
    // console.log(matchesCategory);
    // console.log(matchesVendor);
    return res;
  }
  
  const filteredData = data.filter((transaction: Transaction) => shouldDisplay(transaction));
  // console.log(filteredData.length);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="table">
        <TableHead sx={{ backgroundColor: "#F9F9FB"}}>
          <TableRow>
            {
              columns.map((column: string) => {
                return (
                  <TableCell key={column} align="left">{column}</TableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            filteredData.map((row: Transaction) => {
              return (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.account_name}
                </TableCell>
                <TableCell align="left">{row.coverage_lines}</TableCell>
                <TableCell align="left">{row.uw_name}</TableCell>
                <TableCell align="left">{row.premium}</TableCell>
                <TableCell align="left">{row.state}</TableCell>
                <TableCell align="left">{row.effective_date}</TableCell>
                <TableCell align="left">{row.expiration_date}</TableCell>
                <TableCell align="left">{row.sic}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
              </TableRow>
            )})
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
