import "./App.css";
import React, { useEffect, useState } from "react";
import TableComponent from "./TableComponent";
import SplitButton from "./Buttons";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import InfiniteLoadingGrid from "./TableComponentLazyLoading";

function App() {
  const [dataFromUi, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openBulkUpdate, setOpenBulkUpdate] = useState(false);
  const LOAD_LIMIT = 50
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
const loadData = ()=>{
const currentLoaded = dataFromUi.length
  fetch("http://localhost:5233/WeatherForecast?limit="+LOAD_LIMIT+"&offset="+currentLoaded)
  .then((res) => res.json())
  .then((data) => {
    setData(data);
  });
}
  useEffect(() => {
    loadData()
  }, []);
  const options = [
    "Show Duplicates",
    "Generic Operation1",
    "GenericOperation2",
    "GenericOperation3",
    "GenericOperation3",
    "GenericOperation4",
  ];
  const config = ["Configure Cols", "fav1", "fav2"];
  const configCols = (e) => {
    setOpen(true);
  };
  const getCols = () => {
    if (dataFromUi.columns)
      return (
        <div>
          {dataFromUi.columns.map((x) => (
            <div>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={x}
              />
            </div>
          ))}
        </div>
      );
  };
  const handleClose = () => {
    setOpen(false);
  };
  const loadFav = (name) => {
    debugger;
  };
  const loadTableComponent = ()=>{
    if(dataFromUi.columns && dataFromUi.columns.length>0){
      return (
      // <TableComponent data={dataFromUi} /> 
      <InfiniteLoadingGrid data={dataFromUi}/>
      );
    }
  }
  const configHandler = [configCols, (name) => loadFav(name)];
  return (
    <div>
      <div>
        <div style={{ marginTop: 50, marginBottom: 30,display: "flex",flexDirection: "row" }}>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              size="small"
              style={{width:"30%"}}
            />
          <div style={{marginLeft:50}}>
            <SplitButton options={options} />
            <Button>Bulk Update</Button>
            <Button>Generic Option 1</Button>
            <SplitButton
              isConfig={true}
              options={config}
              functions={configHandler}
            />
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ maxHeight: 500, overflow: "auto" }}>{getCols()}</div>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>~
          <div style={{ maxHeight: 500, overflow: "auto" }}>{getCols()}</div>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
      {loadTableComponent()}
    </div>
  );
}

export default App;
