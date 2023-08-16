import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Wallet , Leaderboard , PieChart ,Assignment } from '@mui/icons-material';
import LeaderBoardList from './LeaderBoard';
import PieRechartComponent from './CompareExpense';
import ExpenseTab from './ExpenseTab';
import StickyHeadTable from './ReportTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width:'60vw' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          
        >
          <Tab icon={<Wallet/>} label="Expenses" {...a11yProps(0)} />
          <Tab icon={<Leaderboard/>} label="Leaderboard" {...a11yProps(1)} />
          <Tab icon={<PieChart/>} label="Compare Expenses" {...a11yProps(2)} />
          <Tab icon={<Assignment/>} label="Expenses Report" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ExpenseTab></ExpenseTab>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <LeaderBoardList></LeaderBoardList>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <PieRechartComponent></PieRechartComponent>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <StickyHeadTable></StickyHeadTable>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}