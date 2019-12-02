import React from 'react'
import { Helmet } from "react-helmet"
import Axios from 'axios'

class ProfileUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      contactNumber: '',
      skill: '',
      isAdmin: false,
      isArtist: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    if(event.target.type === 'checkbox') {
      this.setState({
        [event.target.name]: event.target.checked
      })
    }else{
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  handleSubmit(event) {
    console.log(this.state)
    Axios.patch(`http://localhost:4000/user/${this.props.match.params.user_id}/update`, {
      'name': this.state.name,
      'contactNumber': this.state.contactNumber,
      'skill': this.state.skill,
      'isAdmin': this.state.isAdmin,
      'isArtist': this.state.isArtist
    }, {
      headers: {
        'x-auth-token': sessionStorage.token
      }
    }).then(function(response) {
      window.location.replace('/');
    }).catch(function(error) {
      console.log("Something went wrong.")
    })
    event.preventDefault()
  }

  componentDidMount() {
    // eslint-disable-next-line
    const user = eval('(' + sessionStorage.user + ')');
    Axios.get(`http://localhost:4000/user/${user.id}`)
      .then((response) => {
        this.setState({
          name: response.data[0].name,
          contactNumber: response.data[0].contactNumber,
          skill: response.data[0].skill,
          isAdmin: response.data[0].isAdmin,
          isArtist: response.data[0].isArtist
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    const inputFieldStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-5"
    const buttonStyle     = "block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    return (
      <div className="my-5">
        <Helmet>
          <title>Update Profile</title>
        </Helmet>
        <form>
          <div>
            <label>
              Is admin:
              <input
                name="isAdmin"
                type="checkbox"
                checked={this.state.isAdmin}
                onChange={this.handleChange} />
            </label>
          </div>
          <div>
            <label>
              Is artist:
              <input
                name="isArtist"
                type="checkbox"
                checked={this.state.isArtist}
                onChange={this.handleChange} />
            </label>
          </div>
          <input className={inputFieldStyle} onChange={this.handleChange} name="name" value={this.state.name} />
          <input className={inputFieldStyle} onChange={this.handleChange} name="contactNumber" value={this.state.contactNumber} />
          <input className={inputFieldStyle} onChange={this.handleChange} name="skill" value={this.state.skill} />
          <button className={buttonStyle} onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

export default ProfileUpdate;
