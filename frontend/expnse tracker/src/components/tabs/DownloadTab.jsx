import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { useSelector } from "react-redux";
import PremiumComponent from "../BuyPremium";
import {useState , useEffect} from 'react';
import axios from 'axios'


async function fetchDownloads(idToken) {
    const response = await axios.get(
      `http://localhost:3000/downloads`,{
          headers:{
              Authorization:idToken,
          }
      }
    );
    const downloads = response.data;
    return downloads;
  }

const DownloadsList = () => {
  const isPremium = useSelector((state) => state.auth.isPremium);
  const idToken = useSelector((state) => state.auth.idToken);
  const [downloadsList , setDownloadsList] = useState([])
    
  useEffect(()=>{
    if(isPremium){
        fetchDownloads(idToken).then(downloads=>{
        console.log(downloads);
        setDownloadsList(downloads)
      })
    }
  },[isPremium])
  return (
    <div style={{ height: "68vh", overflow: "auto" }}>
      {!isPremium && <PremiumComponent />}
      {isPremium && (
        <List>
          {downloadsList.map((download) => (
            <ListItem key={download.id} sx={{backgroundColor:'#f5f5f5',marginBottom:'0.5rem',boxShadow:'2px 2px 5px rgba(0, 0, 0, 0.3)',borderRadius:'5px'}}>
              <ListItemText primary={download.name} secondary={download.date} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="download">
                  <Download />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default DownloadsList;
