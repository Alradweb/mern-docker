import React from "react"
import { Router, Location } from "@reach/router"
import DetailLink from "./detail-link"


export default function Detail() {
  return (
    <Location>
      {({ location }) => (
        <Router location={location}>
          <DetailLink path="/"/>
        </Router>
      )}
    </Location>
  )
}