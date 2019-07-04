import React, { Component } from "react";
export default class ScrollButton extends Component {
  constructor() {
    super();

    this.state = {
      intervalId: 0
    };
  }
  componentDidMount() {
    window.onscroll = function() {
      scrollFunction();
    };

    function scrollFunction() {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("backTop").style.display = "block";
      } else {
        document.getElementById("backTop").style.display = "none";
      }
    }
  }
  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <button
        id="backTop"
        title="Back to top"
        className=" btn back-to-top scroll btn-circle btn-primary btn-lg"
        onClick={() => {
          this.scrollToTop();
        }}
      >
        <span className="nicon-arrow-up2" />
      </button>
    );
  }
}