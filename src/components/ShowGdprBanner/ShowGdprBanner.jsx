import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';

const messages = defineMessages({
  buttonShowLabel: {
    id: 'volto-gdpr-privacy-buttonShowLabel',
    defaultMessage: 'Show cookies settings',
  },
});

const ShowGdprBanner = () => {
  const intl = useIntl();

  return (
    <Button
      basic
      className="gdpr-privacy-show-banner"
      onClick={(e) => {
        console.log('evento', e);
      }}
    >
      {intl.formatMessage(messages.buttonShowLabel)}
    </Button>
  );
};

export default ShowGdprBanner;
