import React, { createRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Undo, Redo, Save, FileUpload } from '@mui/icons-material';

export default function ButtonAppBar(props) {
  const {
    onUndoClick,
    onRedoClick,
    fileDownloadUrl,
    doFileUpload,
    switchChecked,
    onSwitchChange
  } = props;
  
  const linkFileSaveRef = createRef();
  const inputFileUploadRef = createRef();
  const fileUploadInputChange = async (event) => {
    const fileObj = event.target.files[0];
    if (fileObj) {
      const fileContent = await fileObj.text();
      doFileUpload(fileContent);
      inputFileUploadRef.current.value = null
    }
  }

  const actions = [
    { svg: Undo, onClick: onUndoClick, tooltip: "Undo changes" },
    { svg: Redo, onClick: onRedoClick, tooltip: "Redo changes" },
    { svg: Save, onClick: () => { linkFileSaveRef.current.click(); }, tooltip: "Save current raw map"},
    { svg: FileUpload, onClick: () => { inputFileUploadRef.current.click(); }, tooltip: "Load map from file"},
  ];

  return (
      <AppBar position="static">
        <Toolbar> {(actions || []).map((value, index) => (
          <Tooltip key={index} title={value.tooltip}>
            <IconButton size="large" color="inherit" sx={{ mr: 2 }} onClick={value.onClick}>
              <value.svg fontSize="large"/>
            </IconButton>
          </Tooltip>
          ))}
          <FormControlLabel control={
            <Switch id="SwitchMap"
              size="large"
              color="default"
              checked={switchChecked}
              onChange={onSwitchChange}
            />
          } label={(switchChecked? "Hide": "View") + " Map"} />
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography> */}
          {/* <Button color="inherit">Login</Button> */}
        <a hidden download={"current_map.json"} href={fileDownloadUrl} ref={linkFileSaveRef}/>
        <input type="file" hidden multiple={false} accept=".json,application/json"
          ref={inputFileUploadRef}
          onChange={(e) => fileUploadInputChange(e)}
        />
        </Toolbar>
      </AppBar>
  );
}