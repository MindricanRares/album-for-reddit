import React from "react";
import Slider from "react-slick";
import "../App.css";

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }

  getImages = () => {
    if(this.props.posts.length>0){
      let images = this.props.posts.reduce((result,post) => {
        if (post.url.split(".")[post.url.split(".").length - 1] == "jpg") {
          result.push(post);
        }
        return result;
      },[]);
      return images;
    }
    return [];
  };

  createSlideShow = () => {
    let images=this.getImages();
    return images.map(post => {
      return (
        <div>
          <div>
            <img src={post.url} />
          </div>
          <div className="slider-button">
            <button className="btn btn-primary" onClick={()=>{this.props.addPostToSeenList(post)}}>Test</button>
          </div>
        </div>
      );
    });
  };
  handleChange=(oldIndex,newIndex)=>{
    console.log(oldIndex+" "+newIndex);
    debugger;
    this.props.addPostToSeenList(this.props.posts[newIndex-1]);
  }

  render() {
    var settings = {
      className: "",
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      beforeChange:this.handleChange
    };
    return (
      <div>
        <Slider {...settings}>{this.createSlideShow()}</Slider>
      </div>
    );
  }
}
export default Slideshow;
