import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"
import Home from "@material-ui/icons/Home"
import LinkIcon from "@material-ui/icons/Link"
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/auth"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import AccountCircle from "@material-ui/icons/AccountCircle"
import ListIcon from "@material-ui/icons/List"


const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  link: {
    display: "flex",
    width: "100%",
    alignItems: "center"
  },
  icon: {
    marginRight: 16
  },
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: 2
  },
  homeLink: {
    flexGrow: 1,
    fontSize: 24,
    color: "inherit",
    textDecoration: "none"
  },
  accountWrapper: {
    display: "flex",
    alignItems: "flex-end"
  },
  name: {
    marginRight: 16,
    marginLeft: 3,
    fontSize: 15
  }
})
const SecretRoutes = ({ classes }) => {
  return (
    <>
      <ListItem component={"li"} button key={"Go to Create Link page"}>
        <Link to="/short-link/create-link" activeStyle={{ color: "red" }} className={classes.link}>
          <LinkIcon component={"svg"} className={classes.icon}/>
          <span>Create Link</span>
        </Link>
      </ListItem>
      <ListItem component={"li"} button key={"Go to Link List page"}>
        <Link to="/short-link/link-list" activeStyle={{ color: "red" }} className={classes.link}>
          <ListIcon component={"svg"} className={classes.icon}/>
          <span>Link List</span>
        </Link>
      </ListItem>
    </>
  )
}
export default function Menu() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    left: false
  })
  let greetingMessage = ""
  if (isLoggedIn()) {
    greetingMessage = `${getUser().name.toUpperCase()}`
  } else {
    greetingMessage = ""
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component={"ul"}>
        <ListItem component={"li"} button key={"Go to home"}>
          <Link to="/" className={classes.link}>
            <Home component={"svg"} className={classes.icon}/>
            <span>Home</span>
          </Link>
        </ListItem>
        <ListItem component={"li"} button key={"Go to page-2"}>
          <Link to="/page-2" className={classes.link}>
            <InboxIcon component={"svg"} className={classes.icon}/>
            <span>Page-2</span>
          </Link>
        </ListItem>
        <ListItem component={"li"} button key={"Go to Links page"}>
          <Link to="/short-link/profile" activeStyle={{ color: "red" }} className={classes.link}>
            <LinkIcon component={"svg"} className={classes.icon}/>
            <span>Profile</span>
          </Link>
        </ListItem>
      </List>
      <Divider/>
      {
        isLoggedIn() ?
          (<List component={"ul"}>
            <SecretRoutes classes={classes}/>
          </List>) :
          null
      }
    </div>
  )

  return (
    <nav style={{ backgroundColor: "#477bff30" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={toggleDrawer("left", true)} edge="start" className={classes.menuButton} color="inherit"
                      aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Link to="/" className={classes.homeLink}>
            Gatsby App
          </Link>
          {isLoggedIn() ? (
            <div className={classes.accountWrapper}>
              <AccountCircle/>
              <span className={classes.name}>{greetingMessage}</span>
            </div>
          ) : null}
          <Button color="inherit"
                  onClick={event => {
                    event.preventDefault()
                    logout(() => navigate(`/short-link/login`))
                  }}
          >{isLoggedIn() ? "Logout" : "Login / Register"}
          </Button>
        </Toolbar>
      </AppBar>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </nav>
  )
}
