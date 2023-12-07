import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { MultilingualWidget } from 'volto-multilingual-widget';
import CookiesTextWidget from './CookiesTextWidget';
import ChoicesWidget from './choices/ChoicesWidget';

const messages = defineMessages({
  text: {
    id: 'gdprcookiesettings-cookies-text',
    defaultMessage: 'Text',
  },
  choices: {
    id: 'gdprcookiesettings-cookies-choices',
    defaultMessage: 'Cookies',
  },
});

const CookiesWidget = ({ value, id, title, onChange }) => {
  const intl = useIntl();

  const CookiesTextMultilingualWidget = MultilingualWidget(CookiesTextWidget, {
    title: '',
    description: {},
  });

  return (
    <div className="cookies-widget">
      <Header as="h3" attached="top" block className="cookies-segment-header">
        {title}
      </Header>
      <Segment attached>
        <Grid>
          <Grid.Column width={12} className="cookies-segment">
            <CookiesTextMultilingualWidget
              id="text"
              title={intl.formatMessage(messages.text)}
              value={value.text}
              onChange={(n, v) => {
                onChange(id, { ...value, [n]: JSON.parse(v) });
              }}
            />

            <ChoicesWidget
              id="choices"
              title={intl.formatMessage(messages.choices)}
              value={value.choices}
              onChange={(n, v) => {
                onChange(id, { ...value, [n]: v });
              }}
              type={id}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};

export default CookiesWidget;
