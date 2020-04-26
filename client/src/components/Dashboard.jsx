import React from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ListIcon from '@material-ui/icons/List';
import PdfReader from './PdfReader.jsx';

import Box from '@material-ui/core/Box';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    margin: "auto"
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [fileSubmitted, setFileSubmitted] = React.useState(false);
  const [file, setFile] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myfile', file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.get("http://localhost:8000/upload",formData,config)
        .then((response) => {
            setFileSubmitted(true);
        }).catch((error) => {
    });
}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="list">
            <ListItemIcon>
              <ListIcon />
              </ListItemIcon>
            <ListItemText primary="List Forms" />
          </ListItem>
          <ListItem button key="upload">
            <ListItemIcon>
              <CloudUploadIcon />
              </ListItemIcon>
            <ListItemText primary="Upload New Form" ><input type='file'/></ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <Box className={classes.container} display="flex" flexDirection="column" justifyContent="center" alignContent="space-around">
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          { fileSubmitted 
          ? <PdfReader/> 
          : <div>
              <form onSubmit={onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" className="custom-file-input" name="myFile" onChange= {(e) => setFile(e.target.files)} />
                <button className="upload-button" type="submit">Upload to DB</button>
              </form>
            </div>
          }
        </main>
      </Box>
    </div>
  );
}
