import React from 'react';
import { useDispatch } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { displayBanner } from '../../actions';
import cookieSVG from './user-lock-solid.svg';

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

  return (
    <button
      className="gdpr-privacy-show-banner"
      onClick={(e) => {
        e.preventDefault();
        dispatch(displayBanner(true));
      }}
      title={intl.formatMessage(messages.buttonShowLabel)}
    >
      <img src={cookieSVG} alt={intl.formatMessage(messages.buttonShowLabel)} />
    </button>
  );
};

export default ShowGdprBanner;
