import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import Layout from "../components/layout"
import Profile from "../components/profile"
import Login from "../components/login"
import CreateLink from "../components/create-link"
import LinkList from "../components/link-list"
import Detail from "../components/detail"

const ShortLink = () => (

  <Layout>
    <Router style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <PrivateRoute path="/short-link/profile" component={Profile}/>
      <PrivateRoute path="/short-link/create-link" component={CreateLink}/>
      <PrivateRoute path="/short-link/link-list" component={LinkList}/>
      <PrivateRoute path="/short-link/detail/:id" component={Detail}/>
      <Login path="/short-link/login"/>
    </Router>
  </Layout>
)
export default ShortLink