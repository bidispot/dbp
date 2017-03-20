// @flow
import React, {Component} from 'react';
import {Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {injectIntl} from 'react-intl';
import {authorize, authorizeSuccess, authorizeError} from '../actions';
import {isProcessing, isAuthorized, getAccessToken, getExpiration, getAuthError} from '../selectors';
import AuthUtils from '../../../utils/auth';

class WelcomePage extends Component {

  constructor(props) {
    super(props);

    let access_token = null;
    let expires_in = null;

    const uri_params = AuthUtils.getParams()
    if (uri_params !== null && uri_params) {
      access_token = uri_params.access_token;
      expires_in = uri_params.expires_in;
    }

    console.log("URI Fragment: ", access_token, expires_in);

    this.state = {
      is_processing: props.is_processing || false,
      is_authorized: props.is_authorized || false,
      access_token: props.access_token !== null ? props.access_token : access_token,
      expires_in: props.expires_in !== null ? props.expires_in : expires_in,
      auth_error: props.auth_error || null
    };

    console.log("From state: ", this.state.access_token, this.state.expires_in);

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
  }

  // Check if consent has already been set (from URL query params) but state is not yet updated, i.e. authorized
  componentWillMount() {
    console.log("Will mount. Is authorized? ", this.state.is_authorized, ". Access token: ", this.state.access_token !== null);
    if (!this.state.is_authorized && this.state.access_token !== null) {
      // set code by calling action
      this.props.authorizeSuccess({access_token: this.state.access_token, expires_in: this.state.expires_in});
    } else if (this.state.is_authorized && this.state.access_token !== null) {
      this.redirectTo();
    }
  }

  componentWillReceiveProps(nextProps) {
    //console.log("Will receive new props. Is authorized? ", nextProps.is_authorized);
    if (nextProps.is_authorized && nextProps.access_token !== null) {
      // redirection to dashboard
      this.redirectTo();
    }
  }

  redirectTo() {
    // const location = this.props.location;
    // if (location && location.state && location.state.nextPathname) {
    //   browserHistory.push(location.state.nextPathname);
    // } else {
    //   browserHistory.push('/dashboard');
    // }
    browserHistory.push('/dashboard');
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.state.is_authorized && this.state.access_token !== null) {
      // set code by calling action
      this.props.authorizeSuccess({access_token: this.state.access_token, expires_in: this.state.expires_in});
    } else {
      this.props.authorize();
    }
  }

  onCancel(e) {
    e.preventDefault();
    this.redirectTo();
  }

  render() {
    return (
      <div className="welcome-main">
        <div className='welcome-title'>
          <Image src={require('../../../../assets/cash_logo.png')} style={{width:65, height:75, marginBottom: 10, marginRight: 20}}/><span
          className='app-title'>Cash 42</span>
        </div>
        <div className='welcome-div'>
          <div className='welcome-title-div'>
            <div className='welcome-subtitle-div'>
              <span className='welcome-subtitle-main'>Dear C42 Bank customers.</span>
              <span className='welcome-subtitle-secondary'>
                The Cash 42 application allows you to get access to all your accounts and their cash balances.<br />
                <br />
                Please click on the box below to sign-in.
              </span>
            </div>
          </div>
          <form className='auth'>
            <p className='title'>Sign-in and authorization</p>
            <p className='label'>Please sign-in to <span className='welcome-consent'>Deutsche Boerse Digital Business Platform</span><br />
              to authorize this application to access your accounts and balances</p>
            <button
              disabled={this.state.is_processing}
              onClick={this.onSubmit}>
              <span className='state'>Sign in with Deutsche Boerse</span>
            </button>
          </form>
          <span className='new-box'><span className='new'>- New -</span><br /><br /> The Cash42 mobile application is now available on the App Store.</span>
          <span className='welcome-footer'>This service is offered by <Image
            src={require('../../../../assets/cash_logo.png')} style={{width:35, height:40}}/><span>42 Bank</span> and powered by <span
            className='welcome-consent'>Deutsche Boerse</span></span>
        </div>
      </div>
    );
  }
}
;

const mapStateToProps = (state) => {
  return {
    is_authorized: isAuthorized(state),
    is_processing: isProcessing(state),
    access_token: getAccessToken(state),
    expires_in: getExpiration(state),
    auth_error: getAuthError(state)
  }
};

export default connect(mapStateToProps, {authorize, authorizeSuccess, authorizeError})(injectIntl(WelcomePage));
