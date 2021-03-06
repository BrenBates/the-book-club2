import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
// import { List, ListItem} from "../components/List/List";
import { Card } from "../components/Card/Card";

class GroupDetails extends Component {
  state = {
    group: {},
    members: {}
  };

  // get my route working
  // on backend: set up route so I can query db and get members
  // either query the group and populate members, or query members with groupId

  // then I can do an axios call to grab my groupId, send it to backend
  // and get a response.
  // then I can work on getting it on the screen


  // When this component mounts, grab the group with the _id of this.props.match.params.id
  // e.g. localhost:3000/group/5234
  componentDidMount() {
    API.getGroup(this.props.match.params.id)
      .then(res => this.setState({ group: res.data }))
      .catch(err => console.log(err));
      this.loadMembers();
  }

  loadMembers = () => { 
    API.getMember(this.props.match.params.id)
    .then(res => this.setState({ members: res.data}))
    .catch(err => console.log(err));
  }

  deleteMember = id => {
    API.deleteMember(id)
    .then(res => this.loadMembers())
    .catch(err => console.log("error is: " + err));
    console.log("did I hit delete member? memberID = " + id)
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("you hit submit");
    if (this.state.name) {
      API.saveMember({
        _groupId: this.state.group,
        name: this.state.name,
      })
        .then(res => this.loadMembers())
        .then(console.log("this is after saving member"))
        .catch(err => console.log(err));
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {

    return (
        <div className="w-full max-w-lg container">
            <h1>
                Group Name: 
                <strong>{this.state.group.name}</strong>
            </h1>
            <p>
                Enter your book club members
            </p>
            <div className="">
                <form className="m-4 flex">
                    <input className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="member name" type="text"
                    value={this.state.name} name="name" onChange={this.handleInputChange}/>
                    <button className="shadow bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit"
                    disabled={!(this.state.name)} onClick={this.handleFormSubmit}>Submit</button>
                </form>
            </div>
            <div id="members-go-here">
            {this.state.members.length ? (
              <>
                {this.state.members.map(member => (
                  <Card key={member._id}>
                    <a href={"/members/" + member._id} className="font-bold text-xl ">
                      {member.name}
                    </a>
                    <div className="flex items-center justify-center">
                    <div className="m-3">
                      <button className="bg-white text-gray-800 rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center font-bold"
                      onClick={() => this.deleteMember(member._id)}>
                        <span className="mr-2">Delete</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentcolor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                        </svg>
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            ) : (
              <h3>No Results to Display</h3>
            )}
            </div>
            
            {/* <div id="book-club-details-go-here" className="inline-block">
              <p>How often does the group meet?</p>
              <p id="next-meetup-goes-here"></p>
            </div> */}

            <Link to="/group">
            <div className="flex items-center justify-left mb-12">
                <div className="m-3">
                    <button className="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                    <span className="mr-2">← Back</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        
                    </svg>
                    </button>
                </div>
            </div>
            </Link>
        </div>
    );
  }
}

export default GroupDetails;
