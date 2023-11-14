import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import { MultipleSelectChip } from "../components/MultiSelect";
import { DropdownWrapper } from "../components/DropdownWrapper";
import { RangeSlider } from "../components/RangeSlider";
import styles from "../../styles/Filters.module.css";
import { AutoCompleteCheckboxes } from "../components/AutoCompleteChecboxes";
import { clearFilters, updateFilters } from "../actions/actions";
import { useSelector, useDispatch, RootStateOrAny} from 'react-redux';

export const Filters = ({
  statuses,
  coverage_lines,
  deal_stages,
  uw_names
}: {
  statuses: Array<string>,
  coverage_lines: Array<string>,
  deal_stages: Array<string>,
  uw_names: Array<string>
}) => {
  const dispatch = useDispatch();
  const updateStatuses = (statuses: Array<string>) => {
    dispatch(updateFilters('statuses', statuses))
  }
  const updateCoverageLines = (coverage_lines: Array<string>) => {
    dispatch(updateFilters('coverage_lines', coverage_lines))
  }
  const updateDealStages = (deal_stages: Array<string>) => {
    dispatch(updateFilters('deal_stages', deal_stages))
  }
  const updateUWNames = (uw_names: Array<string>) => {
    dispatch(updateFilters('uw_names', uw_names))
  }
  const clearAll = () => {
    dispatch(clearFilters());
  }

  return (
    <Box display="flex" justifyContent="space-between" sx={{
      width: '780px',
      backgroundColor: 'white',
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderWidth: "1px",
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: '15px',
      borderBottomRightRadius: "4px",
      borderBottomLeftRadius: "4px",
    }}>
      <div className={styles.filtersContainer}>
        <MultipleSelectChip
          title="Status"
          list={statuses}
          onHandleChange={updateStatuses}
        />
        <MultipleSelectChip
          title="Line of Coverage"
          list={coverage_lines}
          onHandleChange={updateCoverageLines}
        />
        <MultipleSelectChip
          title='Deal Stage'
          list={deal_stages}
          onHandleChange={updateDealStages}
        />
        <MultipleSelectChip
          title='Underwriter'
          list={uw_names}
          onHandleChange={updateUWNames}
        />
      </div>
      <Button disabled onClick={clearAll}>Clear All</Button>
    </Box>
  )
}
