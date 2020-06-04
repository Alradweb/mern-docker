import React, { useState } from "react"
import { getUser } from "../services/auth"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField/TextField"
import Button from "@material-ui/core/Button"
import ReplyAllIcon from '@material-ui/icons/ReplyAll';
import { useHttp } from "../services/http.hook"
import { navigate } from "gatsby"
import {isBrowser} from "../services/auth"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  registerLink: {
    cursor: "pointer"
  },
  snackbar:{
    backgroundColor: 'tomato'
  }
}))
const CreateLink = () => {
  const [link, setLink] = useState('')
  const classes = useStyles()
  const {request} = useHttp()
  const handleUpdate = event =>{
    setLink(event.target.value)
  }
  const handleSubmit = async ev =>{
    //console.log(ev.key)
    if ((ev.key === 'Enter' || ev.type === 'click') && link.trim().length) {
      try {
        const user = getUser()
        const data = await request("/api/link/generate", "POST", {from: link}, {Authorization : user.token})
        if(isBrowser()) window.localStorage.setItem('Link-detail', JSON.stringify(data.link))
        navigate(`/short-link/detail/${data.link._id}`)
      }catch (e) {

      }
    }

  }
return(

    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ReplyAllIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          {'Create Link'}
        </Typography>
        <form className={classes.form} onSubmit={(e) => e.preventDefault()} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="link"
            type={"text"}
            label="Add Link"
            name="link"
            value={link}
            onChange={handleUpdate}
            onKeyPress={handleSubmit}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={false}
          >
            {'Создать ссылку'}
          </Button>

        </form>
      </div>
    </Container>
)}
export default CreateLink