import React, { Component } from "react";
import "./App.css";
import Album from "./components/album";
import SeenAlbum from "./components/seen-album";
import Slideshow from "./components/slide-show";
const Snoowrap = require("snoowrap");
require('dotenv').config({path:'../.env'})

class App extends Component {
  constructor(params) {
    super();
    this.state = {
      posts: [],
      seenPosts: []
    };
  }

  componentDidMount = () => {
    debugger;
    console.log(process);
    const r = new Snoowrap({
      userAgent: process.env.REACT_APP_USER_AGENT,
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      username: process.env.REACT_APP_USER_NAME,
      password: process.env.REACT_APP_PASSWORD
    });
    let callback = this.populatePostState;
    r
      .getSubreddit("macsetups")
      .getNew()
      .map(post => post)
      .then(posts => {
        callback(posts);
      });
    r
      .getSubreddit("battlestations")
      .getNew()
      .map(post => post)
      .then(posts => {
        callback(posts);
      });
    r
      .getSubreddit("battletops")
      .getNew()
      .map(post => post)
      .then(posts => {
        callback(posts);
      });
    r
      .getSubreddit("AverageBattlestations")
      .getNew()
      .map(post => post)
      .then(posts => {
        callback(posts);
      });
  };

  addPostToSeenList = (post, index) => {
    this.setState(prevState => ({
      seenPosts: [...prevState.seenPosts.concat(post)]
    }));
    console.log("Seen posts" + this.state.seenPosts.length);
    let array = this.state.posts;
    array.splice(index, 1);
    this.setState({
      posts: array
    });
    console.log("Posts array" + this.state.posts.length);
  };

  populatePostState = posts => {
    this.setState(prevState => ({
      posts: [...prevState.posts.concat(posts)]
    }));
  };



  render() {
    return (
      <div>
        <h1>BetaTest</h1>
        <div>
          <Slideshow
            posts={this.state.posts}
            addPostToSeenList={this.addPostToSeenList}
          />
        </div>
        <div className="album py-5 bg-light">
          <div className="container">
            {/* <h1>Unseen</h1>
            <Album
              posts={this.state.posts}
              addPostToSeenList={this.addPostToSeenList}
            /> */}
            <h1>Already Seen</h1>
            <SeenAlbum
              posts={this.state.seenPosts}
              addPostToSeenList={this.addPostToSeenList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
