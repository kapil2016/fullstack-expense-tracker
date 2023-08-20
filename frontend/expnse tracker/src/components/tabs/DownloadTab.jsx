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
import { useState, useEffect } from "react";
import axios from "axios";
import {Pagination} from "@mui/material";

async function fetchDownloads(idToken , page) {
  const response = await axios.get(`http://localhost:3000/downloads`, {
    headers: {
      Authorization: idToken,
    },
    params:{
      page:page ,
      size: 10
    }
  });
  const downloads = response.data;
  return downloads;
}

const DownloadsList = () => {
  const isPremium = useSelector((state) => state.auth.isPremium);
  const idToken = useSelector((state) => state.auth.idToken);
  const [downloadsList, setDownloadsList] = useState([]);
  const [pageCount , setPageCount] = useState(1)

  useEffect(() => {
    if (isPremium) {
      fetchDownloads(idToken).then((data) => {
        console.log(data.downloads);
        setDownloadsList(data.downloads);
        setPageCount(data.maxPageCount)
      });
    }
  }, [isPremium]);
  function downloadHandler(url) {
    const newTab = window.open(url, "_blank");
    newTab.focus();
  }

  function pageChangeHandler(event, page) {
    fetchDownloads(idToken, page)
      .then((data) => {
        setDownloadsList(data.downloads);
      })
      .catch(console.log);
  }


  return (
    <div>
    <div style={{ height: "60vh", overflow: "auto" }}>
      {!isPremium && <PremiumComponent />}
      {isPremium && (
        <List>
          {downloadsList.map((download) => (
            <ListItem
              key={download.id}
              sx={{
                backgroundColor: "#f5f5f5",
                marginBottom: "0.5rem",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                borderRadius: "5px",
              }}
            >
              <ListItemText primary={download.name} secondary={download.date} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="download"
                  onClick={() => downloadHandler(download.url)}
                >
                  <Download />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </div>
    <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Pagination
          count={pageCount}
          onChange={pageChangeHandler}
          color="primary"
        />
      </div>
    </div>
  );
};

export default DownloadsList;
