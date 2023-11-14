import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SearhBar from "../src/components/SearchBar";
import Box, { BoxProps } from '@mui/material/Box';
import { purple } from '@mui/material/colors';
import { Filters } from "../src/containers/Filters";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { DataTable } from "../src/components/DataTable";
import { transactions } from "../src/data/mock_transactions";
import { Divider } from "../src/components/Divider";
import { clearFilters, updateFilters} from "../src/actions/actions";

const Home: NextPage = () => {
  const state = useSelector((state: RootStateOrAny) => state);
  const dispatch = useDispatch();

  const COLUMNS = [
    "Account Name",
    "Lines of Coverage",
    "UW Name",
    "Premium (USD)",
    "State",
    "Effective Date",
    "Expiration Date",
    "SIC",
    "Status",
  ]

  let statuses = Array.from(new Set(transactions.map(transaction => transaction.status)));
  let coverage_set: Set<string> = new Set();
  for (var transaction of transactions) {
    transaction.coverage_lines.split(',').forEach(x => coverage_set.add(x));
  }
  let coverage_lines = Array.from(coverage_set);
  let deal_stages = ["Effective", "Expired"];
  let uw_names = Array.from(new Set(transactions.map(transaction => transaction.uw_name)));

  // Search Bar Value Update
  const onSearchTextUpdate = (text: string) => {
    dispatch(updateFilters('searchText', text));
  }

  // on clear search text
  const onClearSearchText = () => {
    dispatch(updateFilters('searchText', ''))
  }

  return (
    <div className={styles.container}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 1,
          m: 1,
          bgcolor: purple[500],
          borderRadius: 1,
          margin: 'auto',
          height: '400px'
        }}
        >
        <h1 className={styles.searchHeader}> Submission Inbox </h1>
        <SearhBar 
          onInputUpdate={onSearchTextUpdate}
          onClear={onClearSearchText}
        />
        <Divider />
        <Filters
          statuses={statuses}
          coverage_lines={coverage_lines}
          deal_stages={deal_stages}
          uw_names={uw_names}
        />
      </Box>
      <DataTable
        columns={COLUMNS}
        data={transactions}
      />
    </div>
  )
}

export default Home
