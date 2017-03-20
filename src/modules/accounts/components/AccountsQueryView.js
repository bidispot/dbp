// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import * as actions from '../actions';
import { getQueryParameters, getIsQuerying } from '../selectors';
import type { ImmutableQueryParameters  } from '../model';
import msg, { Keys } from './AccountsQueryView_messages';
import appMsg, { Keys as AppKeys, APP_VALUES_CURRENCIES_PREFIX } from '../../../i18n/keys';
import type { PropsWithIntl, PropsWithReduxForm } from '../../../types';

type FormProps = {
  paramAccount: ?string,
  paramName: ?string,
  paramCurrency: ?string
};

type OwnProps = {|
  queryParameters: ImmutableQueryParameters,
  isQuerying: boolean,
  initialValues: FormProps
|};

type OwnPropsWithRedux = PropsWithReduxForm<OwnProps, FormProps>;

type Props = PropsWithIntl<OwnPropsWithRedux & {
  query: typeof actions.query
}>;

export class AccountsQueryView extends Component {
  props: Props;

  constructor(props: Props) {
    super(props);

    (this: any).onQuerySubmit = this.onQuerySubmit.bind(this);
    (this: any).onQueryReset = this.onQueryReset.bind(this);
    (this: any).renderSingleSelectField = this.renderSingleSelectField.bind(this);
  }

  onQuerySubmit(values: FormProps) {
    this.props.query(this.buildQueryParametersFromFormValues(values));
  }

  onQueryReset(e: Object) {
    this.props.initialize({
      paramAccount: '',
      paramName: '',
      paramCurrency: ''
    }, false);
  }

  buildQueryParametersFromFormValues(values: FormProps) {
    return {
      account: values.paramAccount,
      name: values.paramName,
      currency: values.paramCurrency
    }
  }

  renderQueryButtonIcon() {
    if (this.props.isQuerying) {
      return (<FontAwesome name='spinner' spin />);
    }
    return (<FontAwesome name='search' />);
  }

  buildCurrencyKey(isoCurrencyCode: string) {
    return `${APP_VALUES_CURRENCIES_PREFIX}${isoCurrencyCode}`;
  }

  renderTextField(field: Field) {
    const { error } = field.meta;
    return (
      <div>
        <FormControl type="text" {...field.input} />
        { error && <span className='text-danger'>{error}</span> }
      </div>
    );
  }

  renderSingleSelectField(field: Field) {
    return (
      <FormControl componentClass="select" {...field.input}>
        <option value="">{this.props.intl.formatMessage({id: AppKeys.VALUES_CURRENCIES_ALL})}</option>
        <option value="EUR">{this.props.intl.formatMessage({id: this.buildCurrencyKey('eur')})} (EUR - €)</option>
        <option value="USD">{this.props.intl.formatMessage({id: this.buildCurrencyKey('usd')})} (USD - $)</option>
        <option value="GBP">{this.props.intl.formatMessage({id: this.buildCurrencyKey('gbp')})} (GBP - £)</option>
        <option value="JPY">{this.props.intl.formatMessage({id: this.buildCurrencyKey('jpy')})} (JPY - ¥)</option>
      </FormControl>
    );
  }

  render() {
    return (
      <Panel collapsible defaultExpanded header={this.props.intl.formatMessage(appMsg(AppKeys.VIEWS_QUERY_HEADER_TITLE))}>
        <Form horizontal onSubmit={this.props.handleSubmit(this.onQuerySubmit)}>
          <FormGroup controlId="account">
            <Col componentClass={ControlLabel} sm={2}>
              <FormattedMessage id={Keys.QUERY_PARAMS_ACCOUNT_LABEL} />
            </Col>
            <Col sm={8}>
              <Field name="paramAccount" component={this.renderTextField} placeholder={this.props.intl.formatMessage(msg(Keys.QUERY_PARAMS_ACCOUNT_PLACEHOLDER))} />
            </Col>
          </FormGroup>

          <FormGroup controlId="name">
            <Col componentClass={ControlLabel} sm={2}>
              <FormattedMessage id={Keys.QUERY_PARAMS_ACCOUNTNAME_LABEL} />
            </Col>
            <Col sm={8}>
              <Field name="paramName" component={this.renderTextField} placeholder={this.props.intl.formatMessage(msg(Keys.QUERY_PARAMS_ACCOUNTNAME_PLACEHOLDER))} />
            </Col>
          </FormGroup>

          <FormGroup controlId="currency">
            <Col componentClass={ControlLabel} sm={2}>
              <FormattedMessage id={Keys.QUERY_PARAMS_CURRENCY_LABEL} />
            </Col>
            <Col sm={8}>
              <Field name="paramCurrency" component={this.renderSingleSelectField} />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button className="query-button" type="submit">
                {this.renderQueryButtonIcon()} <FormattedMessage id={AppKeys.VIEWS_QUERY_BUTTONS_QUERY} />
              </Button>
              <Button className="query-button" type="button" onClick={this.onQueryReset}>
                <FormattedMessage id={AppKeys.VIEWS_QUERY_BUTTONS_RESET} />
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  };
}

export const validate = (values: FormProps): { [key: $Keys<FormProps>]: any } => {
  let errors = {};
  if (values.paramAccount && values.paramAccount.length > 5) {
    // this.props.intl.formatMessage({id: })
    errors.paramAccount = 'Account parameter cannot be longer than five characters.';
  }
  return errors;
}

const mapStateToProps = (state): OwnProps => {
  const queryParameters = getQueryParameters(state);

  return {
    queryParameters: queryParameters,
    isQuerying: getIsQuerying(state),
    initialValues: {
      paramAccount: queryParameters.getAccount(),
      paramName: queryParameters.getName(),
      paramCurrency: queryParameters.getCurrency()
    }
  }
};

export const AccountsQueryViewWithForm = reduxForm({
  form: 'accountsQueryViewForm',
  validate
})(AccountsQueryView);

export default connect(mapStateToProps, { query: actions.query })(injectIntl(AccountsQueryViewWithForm));
