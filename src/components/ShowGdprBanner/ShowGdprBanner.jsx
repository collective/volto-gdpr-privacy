import React from 'react';
import { useDispatch } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { displayBanner } from '../../actions';

import './show-gdpr-banner.less';

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
      basic
      className="gdpr-privacy-show-banner"
      onClick={(e) => {
        e.preventDefault();
        dispatch(displayBanner(true));
      }}
    >
      {intl.formatMessage(messages.buttonShowLabel)}
    </button>
  );
};

export default ShowGdprBanner;
