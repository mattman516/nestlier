import React from 'react';
  import {
    Typography,
    AppBar,
    Toolbar,
    Button,
    Box,
    Hidden,
    IconButton,
    Menu,
    MenuItem,
  } from '@material-ui/core';
  import MenuIcon from '@material-ui/icons/Menu';
  import { withRouter } from 'react-router-dom';


function SpecialAppBar(props) {
    const { title = "Nestlier" } = props;
    return (
      <>
        <AppBar position="sticky" elevation={0} >
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" >{title}</Typography>
            <SpecialMenu {...props} />
          </Toolbar>
        </AppBar>
      </>
    );
  }

  const SpecialMenu = ({ pages = [], history }) => { 
    const [anchorEl, setAnchorEl] = React.useState(null);

    const menuChange = (location) => (e) => {
      history.push(location);
      setAnchorEl(null);
    }
    const menuTrigger = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    return (
      <>
        <Hidden smDown={true}>
          <Box>
            {pages.map(p => {
              return (
                <Button key={p.url} onClick={menuChange(p.url)}>{p.name}</Button>
              )
            })}
          </Box>
        </Hidden>
        <Hidden mdUp={true} >
          <Box>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={menuTrigger}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={menuTrigger}
            >
              {pages.map(p => {
                return (
                  <MenuItem key={p.url} onClick={menuChange(p.url)}>{p.name}</MenuItem>
                )
              })}
            </Menu>
          </Box>
        </Hidden>
      </>
    )
  }
  export default withRouter(SpecialAppBar);