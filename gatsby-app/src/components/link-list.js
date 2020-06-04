import React, { useEffect, useState } from "react"
import { navigate, Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Checkbox from "@material-ui/core/Checkbox"
import Button from '@material-ui/core/Button'
import Avatar from "@material-ui/core/Avatar"
import { getUser } from "../services/auth"
import { useHttp } from "../services/http.hook"
import Spinner from "./spinner"


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 700,
    marginTop: 50,
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    backgroundColor: "#30549ff0"
  }
}))

export default function CheckboxListSecondary() {
  const classes = useStyles()
  const [checked, setChecked] = useState([])
  const [links, setLinks] = useState([])
  const { request, loading } = useHttp()
  useEffect(() => {
    const { token } = getUser()
    const getLinks = async () => {
      try {
        const fetchedLinks = await request("/api/link/", "GET", null, { Authorization: token })
        console.log(fetchedLinks)
        setLinks(fetchedLinks)
      } catch (e) {
        console.log(e)
      }
    }
    getLinks()
  }, [])
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }
  if (loading) return <Spinner/>
  if(!links.length) return <p style={{marginTop: '50px'}}>No links yet...</p>
  return (
    <List dense className={classes.root}>
      {links.map((value, idx) => {
        const labelId = `checkbox-list-secondary-label-${idx}`
        return (
          <ListItem  button   key={value._id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {idx + 1}
              </Avatar>
            </ListItemAvatar>
            <div style={{display: 'flex', flexDirection: 'column'}}>
            <ListItemText id={labelId} primary={`Link:  ${value.from}`}/>
            <ListItemText id={labelId} primary={`Short:  ${value.to}`}/>
            </div>
            <ListItemSecondaryAction>
              <Button variant="outlined"
                      color="primary"
                      onClick={()=> navigate(`/short-link/detail/${value._id}`)}
              >
                Detail
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}
