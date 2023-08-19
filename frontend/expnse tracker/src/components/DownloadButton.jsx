import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'
import { useNavigate } from 'react-router';
import StickyHeadTable from './tabs/ReportTable';
import { useSelector } from 'react-redux';

async function downloadExpense(idToken){
  const res = await axios("http://localhost:3000/expense-report", {
    method: "GET",
    headers:{Authorization:idToken},
  });
  return res.data.url ;

}

const actions = [
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
];

export default function OpenIconSpeedDial() {
  const idToken = useSelector(state => state.auth.idToken)
  const navTo = useNavigate();
  function clickHandler(action){
    if(action === 'Save' ){
      downloadExpense(idToken).then((url)=>{
        const newTab = window.open(url, '_blank');
        newTab.focus();
      }).catch(console.log) ;
    }else if(action === 'Print'){
        // const printWindow = window.open('', '_blank');
        navTo('/print-report/print')
    }
  }

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'absolute', bottom:5, right:16 , zIndex: 2}}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={()=>clickHandler(action.name)}
          />
        ))}
      </SpeedDial>
     </Box>
  );
}