import { Box, IconButton, Tooltip, Zoom, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Send } from "@material-ui/icons";
import { useState, useEffect } from "react";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  container: {
    height: "550px",
    background: "#FFC947",
  },
  notetitle: {
    width: "100%",
    maxWidth: "400px",
    border: 0,
    borderRadius: "4px 4px 0 0",
    padding: "12px 20px",
    outline: "none",
    fontSize: "1.5rem"
  },
  textar: {
    resize: "none",
    width: "100%",
    height: "120px",
    maxWidth: "400px",
    fontFamily: "'Roboto', sans-serif",
    border: 0,
    fontSize: "16px",
    lineHeight: "24px",
    padding: "0 20px",
    outline: "none"
  },
  beltextar: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    padding: "12px 20px",
    borderRadius: "0 0 4px 4px",
  },
  charrem: {
    fontSize: "12px",
    color: "#999"
  }

}))

const Textarea = ({ note, handleAddNote }) => {
  // usestate to this function
  const { title, text, tag } = note;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    const { tag } = e.currentTarget.dataset;
    setCurrentTag(tag);
    console.log(tag);
  };


  const [noteTitle, setNoteTitle] = useState(title);
  const [noteText, setNoteText] = useState(text);
  const [currentTag, setCurrentTag] = useState(tag);
  const characterlimit = 256;
  const titlelimit = 20;
  useEffect(() => {
    setNoteTitle(title);
    setNoteText(text);
    setCurrentTag(tag);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [title, text, tag])

  const handleChange = (e) => {
    if (characterlimit - e.target.value.length >= 0) {
      setNoteText(e.target.value);
    }
  }

  const handleTitleChange = (e) => {
    if (e.target.value.trim().length > 0) {
      if (titlelimit - e.target.value.length >= 0) {
        setNoteTitle(e.target.value);
      }
    }
  }

  const handleSaveClick = async () => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteTitle, noteText, currentTag);
      setNoteText('');
      setNoteTitle('');
      console.log(`${noteTitle} - ${noteText} - ${currentTag}`);
    }
  }

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" height="100%">
        <input type="text" placeholder="Enter Title" className={classes.notetitle} onChange={handleTitleChange} value={noteTitle} />
        <textarea spellCheck="false" className={classes.textar} placeholder="Enter your text" onChange={handleChange} value={noteText}></textarea>
        <Box display="flex" alignItems="center" justifyContent="space-between" className={classes.beltextar}>
          <p className={classes.charrem}>{characterlimit - noteText.length} remaining</p>
          <Box>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              {currentTag}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} data-tag={"Task"}>Task</MenuItem>
              <MenuItem onClick={handleClose} data-tag={"Code"}>Code</MenuItem>
              <MenuItem onClick={handleClose} data-tag={"Reminder"}>Reminder</MenuItem>
              <MenuItem onClick={handleClose} data-tag={"Other"}>Other</MenuItem>
            </Menu>

            <IconButton onClick={handleSaveClick}>
              <Tooltip TransitionComponent={Zoom} title="Save">
                <Send />
              </Tooltip>
            </IconButton>
          </Box>

        </Box>
      </Box>
    </div>
  )
}



export default Textarea;