import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import { List, ListItem} from "../components/List/List";

class MemberDetails extends Component {
  state = {
    members: "",
    book: {}
  };

  // When this component mounts, grab the member with the _id of this.props.match.params.id
  // e.g. localhost:3000/members/5234
  componentDidMount() {
    // console.log("res data: " + this.props.match.params.id)
    API.getSpecificMember(this.props.match.params.id)
      .then(res => this.setState({ members: res.data._id }))
      .catch(err => console.log("error is" + err));
      this.loadBooks();
  }

  loadBooks = () => { 
    API.getBooksByMember(this.props.match.params.id)
    .then(res => this.setState({ book: res.data}))
    .catch(err => console.log(err));
  }

  deleteBook = id => {
    API.deleteBook(id)
    .then(res => this.loadBooks())
    .catch(err => console.log("error is: " + err));
    console.log("did I hit delete book? bookID = " + id)
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("you hit submit");
    if (this.state.name) {
      API.saveBook({
        _memberId: this.state.members,
        title: this.state.name
      })
        .then(res => this.loadBooks())
        .then(console.log("this is after saving book"))
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
        <div className="w-full max-w-sm container">
        <h1>
            Member Name: 
            <strong>{this.state.members}</strong>
        </h1>
        <p>
            This is where I will have the user input books
        </p>
        <div className="">
            <form className="m-4 flex">
                <input className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="book title" type="text"
                value={this.state.name} name="name" onChange={this.handleInputChange}/>
                <button className="px-8 rounded-r-lg bg-green-400  text-gray-800 font-bold p-4 uppercase border-green-500 border-t border-b border-r" type="submit"
                disabled={!(this.state.name)} onClick={this.handleFormSubmit}>Go</button>
            </form>
        </div>

        <div id="books-go-here" className="rounded-lg border-blue-500 inline-block">
            {this.state.book.length ? (
              <List>
                {this.state.book.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        book ID: {book._id}
                        <br/>
                        book Name: {book.title}
                      </strong>
                    </a>
                    <div className="flex items-center justify-left">
                    <div className="m-3">
                      <button className="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                      onClick={() => this.deleteBook(book._id)}>
                        <span className="mr-2">Delete</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentcolor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                        </svg>
                        </button>
                      </div>
                    </div>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            </div>

            <Link to="/group">
            <div className="flex items-center justify-left">
                <div className="m-3">
                    <button className="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                    <span className="mr-2">← Back to Groups</span>
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
  
  export default MemberDetails;
  