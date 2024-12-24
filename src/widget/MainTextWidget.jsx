import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { TextWidget } from '@plone/volto/components/manage/Widgets';

import SlateRichTextWidget from '@plone/volto-slate/widgets/RichTextWidget';

const messages = defineMessages({
  title: {
    id: 'gdprcookiesettings-banner-title',
    defaultMessage: 'Banner title',
  },
  description: {
    id: 'gdprcookiesettings-banner-description',
    defaultMessage: 'Main banner text description',
  },
  description_description: {
    id: 'gdprcookiesettings-banner-description_description',
    defaultMessage:
      'Main banner text description, where you can link privacy policy page for example.',
  },
});

const MainTextWidget = ({ value, id, onChange }) => {
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

export default MainTextWidget;
