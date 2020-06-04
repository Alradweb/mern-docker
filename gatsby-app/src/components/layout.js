import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import "./layout.css"
import Typography from "@material-ui/core/Typography"
import Menu from "./menu"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingRight: 16,
    paddingLeft: 16,
    overflowX: 'hidden'
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
    {/*<Header siteTitle={data.site.siteMetadata.title}/>*/}
    <Menu/>
    <Grid component={'main'}
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          className={classes.root}
    >
        {children}
    </Grid>
      <Grid component={'footer'}
            container
            direction="column"
            justify="space-around"
            alignItems="center"
      >
        <Typography component={'p'} gutterBottom variant="subtitle1">
          © {new Date().getFullYear()}
        </Typography>
        <Typography component={'p'}>
          Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Typography>
      </Grid>
      </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
