import React, { Component } from 'react'; 
import { Grid, Row, Col, Image } from "react-bootstrap";

const imgSrc = [require('../../assets/cash.png'),
                require('../../assets/indicators.png'),
                require('../../assets/accounts.png'),
                require('../../assets/pricing.png')];
const imgHoverSrc = [require('../../assets/cash-fill.png'),
                      require('../../assets/indicators-fill.png'),
                      require('../../assets/accounts-fill.png'),
                      require('../../assets/pricing-fill.png')];

export default class NavBar extends Component {

  constructor(props) {    
    super(props);
    this.state = {
        onHover: -1
    };
    
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.getImg = this.getImg.bind(this);
  }

  handleMouseOver(event) {
    var result = imgSrc.findIndex(element => event.target.src.indexOf(element) !== -1);
    this.setState( { onHover: result } );
  }

  handleMouseOut(event) {
    this.setState( { onHover: -1 } );
  }

  getImg(index) {
    const imgSource = this.state.onHover === index ? imgHoverSrc[index] : imgSrc[index];
    return imgSource;
  }

  render() {
    return (
      <Grid>
        <Row style={{ marginTop: 100 }}>
          <Col xs={6} md={6} style={{ paddingRight: 100 }}>
            <div className="pull-right">
              <Image onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} src={this.getImg(0)} />
              <br />
              <div style={{ marginTop:20, textAlign:'center' }}>
                <span style={{ textAlign:'center' }}>Cash balances</span>
              </div>
            </div>
          </Col>
          <Col xs={6} md={6} style={{ paddingLeft: 100 }}>
            <div className="pull-left">
              <Image onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} src={this.getImg(1)} />
              <br />
              <div style={{ marginTop:20, textAlign:'center' }}>
                <span style={{ textAlign:'center' }}>Indicators</span>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 100 }}>
          <Col xs={6} md={6} style={{ paddingRight: 100 }}>
            <div className="pull-right">
              <Image onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} src={this.getImg(2)} />
              <br />
              <div style={{ marginTop:20, textAlign:'center' }}>
                <span style={{ textAlign:'center' }}>Accounts</span>
              </div>
            </div>
          </Col>
          <Col xs={6} md={6} style={{ paddingLeft: 100 }}>
            <div className="pull-left">
              <Image onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} src={this.getImg(3)} />
              <br />
              <div style={{ marginTop:20, textAlign:'center' }}>
                <span style={{ textAlign:'center' }}>Pricing</span>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}