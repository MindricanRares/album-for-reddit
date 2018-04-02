import React, { Component } from "react";
var _ = require("lodash");

class Album extends Component {
  constructor(props) {
    super(props);
  }

  compareCreateDate(a, b) {
    if (a.created > b.created) return 1;
    if (a.created < b.created) return -1;
    return 0;
  }

  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  viewBtn=(post,index)=>{
    window.open(post.url);
    this.props.addPostToSeenList(post,index);
  }


  displayPosts = () => {
    if (this.props.posts.length === 0) {
      return <p>Loading</p>;
    } else {
      let sortedPosts = this.props.posts.sort(this.compareCreateDate);
      return sortedPosts.map((post, index) => {
        if (post.url.split(".")[post.url.split(".").length - 1] == "jpg") {
          return (
            <div className="col-sm-12" key={index}>
              <div className="card sm-12 box-shadow">
                <img
                  className="card-img-top"
                  data-src={post.url}
                  alt="Thumbnail [100%x225]"
                  src={post.url}
                  data-holder-rendered="true"
                />
                <div className="card-body">
                  <p className="card-text">Created {this.timeConverter(post.created_utc)}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={()=>{this.viewBtn(post,index)}}
                      >
                        View 
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      });
    }
  };

  render() {
    return (
      <div>
        <div className="row">{this.displayPosts()}</div>
      </div>
    );
  }
}

export default Album;
