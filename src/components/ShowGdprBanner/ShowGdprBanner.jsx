import React from 'react';
import { useDispatch } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { displayBanner } from '../../actions';
import { Button } from 'semantic-ui-react';
import cookieSVG from './user-lock-solid.svg';

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
    <Button
      icon
      className="gdpr-privacy-show-banner"
      onClick={(e) => {
        e.preventDefault();
        dispatch(displayBanner(true));
      }}
    >
      <img src={cookieSVG} alt={intl.formatMessage(messages.buttonShowLabel)} />
    </Button>
  );
};

export default ShowGdprBanner;
