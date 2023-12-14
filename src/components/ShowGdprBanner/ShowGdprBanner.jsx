import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { displayBanner } from '../../actions';
import cookieSVG from './user-lock-solid.svg';
import defaultConfig from '../../config/temp_defaultConfig'; //[ToDo]: remove this when data is received from @cmponents
import './show-gdpr-banner.css';

const messages = defineMessages({
  buttonShowLabel: {
    id: 'volto-gdpr-privacy-buttonShowLabel',
    defaultMessage: 'Show cookies settings',
  },
});

const ShowGdprBanner = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const gdpr_cookie_infos = useSelector(
    (state) =>
      state.content.data?.['@components']?.['gdpr-cookie-infos'] ??
      defaultConfig, ////[ToDo]: remove this when data is received from @cmponents and use this {} as default,,
  );

  const show = gdpr_cookie_infos.banner_enabled && gdpr_cookie_infos.show_icon;
  return show ? (
    <button
      className="gdpr-privacy-show-banner"
      onClick={(e) => {
        e.preventDefault();
        dispatch(displayBanner(true, true));
      }}
      title={intl.formatMessage(messages.buttonShowLabel)}
    >
      <img src={cookieSVG} alt={intl.formatMessage(messages.buttonShowLabel)} />
    </button>
  ) : (
    <></>
  );
};

export default ShowGdprBanner;
