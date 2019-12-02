import React from 'react'
import { Helmet } from "react-helmet"

class Homepage extends React.Component {
  render() {
    return (
      <div className="my-5">
        <Helmet>
          <title>Profile</title>
        </Helmet>
        { this.props.match.params.user_id }
      </div>
    )
  }
}

export default Homepage;
