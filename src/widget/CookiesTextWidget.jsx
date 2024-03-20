import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { TextWidget } from '@plone/volto/components';

import SlateRichTextWidget from '@plone/volto-slate/widgets/RichTextWidget';

const messages = defineMessages({
  title: {
    id: 'gdprcookiesettings-cookies-title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'gdprcookiesettings-cookies-description',
    defaultMessage: 'Description',
  },
  description_description: {
    id: 'gdprcookiesettings-cookies-description_description',
    defaultMessage:
      'Cookie text description, where you can explain what are this type of cookie, for example.',
  },
});

const CookiesTextWidget = ({ value, id, onChange }) => {
  const intl = useIntl();

  return (
    <>
      <TextWidget
        id="title"
        title={intl.formatMessage(messages.title)}
        value={value.title}
        onChange={(n, v) => {
          onChange(id, { ...value, [n]: v });
        }}
      />

      <SlateRichTextWidget
        id="description"
        title={intl.formatMessage(messages.description)}
        description={intl.formatMessage(messages.description_description)}
        value={value.description}
        onChange={(n, v) => {
          onChange(id, { ...value, [n]: v });
        }}
      />
    </>
  );
};

export default CookiesTextWidget;
