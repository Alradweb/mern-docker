import React, { useState } from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { useHttp } from "../services/http.hook"
import Snackbar from "@material-ui/core/Snackbar/Snackbar"
import Spinner from "./spinner"

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

export default function SignIn() {
  const [state, setState] = useState({ email: "", password: "", name: "" })
  const [isRegisterForm, setIsRegisterForm] = useState(false)
  const [snackText, setSnackText] = useState(null)
  const { loading, request, error, clearError } = useHttp()
  const classes = useStyles()

  const handleUpdate = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...state })
      setState({
        ...state,
      email: "", password: "", name: ""
      })
      setSnackText(data.message)
      navigate(`/short-link/profile`)
    } catch (e) {
      setSnackText(e.message)
      clearError()
    }
  }
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...state })
      setState({
        ...state,
        email: "", password: "", name: ""
      })
      setSnackText(data.message)
      handleLogin(data)
    } catch (e) {
      setSnackText(e.message)
      clearError()
    }
  }
  const handleSubmit = event => {
    event.preventDefault()
    if(isRegisterForm){
      registerHandler()
    }else loginHandler()
  }
  if (isLoggedIn()) {
    navigate(`/short-link/profile`)
  }
  if(loading) return  <Spinner/>
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Snackbar
        classes={{root: classes.snackbar}}
        anchorOrigin={ {vertical: 'top', horizontal: 'center' }}
        open={!!snackText}
        onClose={()=>setSnackText(null)}
        transitionDuration={300}
        autoHideDuration={3000}
        message={snackText}
        key={'snackbar'}
      />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          {isRegisterForm ? "Register" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={(e) => e.preventDefault()} noValidate>
          {
            isRegisterForm ? (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
                value={state.name}
                autoComplete="current-name"
                onChange={handleUpdate}
              />
            ) : null
          }
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type={"email"}
            label="Email Address"
            name="email"
            value={state.email}
            autoComplete="email"
            autoFocus
            onChange={handleUpdate}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={state.password}
            autoComplete="current-password"
            onChange={handleUpdate}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary"/>}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={loading}
          >
            {isRegisterForm ? "Register" : "Sign in"}
          </Button>
          <Grid container>
            {!isRegisterForm ? (
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            ) : null}
            {
              !isRegisterForm ? (
                <Grid item>
                  <Link className={classes.registerLink} variant="body2" onClick={() => setIsRegisterForm(true)}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              ) : null
            }
          </Grid>
        </form>
      </div>
    </Container>
  )
}
