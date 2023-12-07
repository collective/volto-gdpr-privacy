import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { MultilingualWidget } from 'volto-multilingual-widget';
import { TextWidget, ArrayWidget } from '@plone/volto/components';
import SlateRichTextWidget from '@plone/volto-slate/widgets/RichTextWidget';
import ChoiceTextWidget from './ChoiceTextWidget';
import ReferenceUrlsWidget from './ReferenceUrlsWidget';

const messages = defineMessages({
  config_key: {
    id: 'gdprcookiesettings-choice_config_key',
    defaultMessage: 'Key',
  },
  text: {
    id: 'gdprcookiesettings-choice_text',
    defaultMessage: 'Text',
  },
  referenceUrls: {
    id: 'gdprcookiesettings-choice_referenceUrls',
    defaultMessage: 'Reference URLs',
  },
});

const SingleChoiceWidget = ({ value, onChange, type }) => {
  //type: [technical, profiling]
  const intl = useIntl();

  const TextMultilingualWidget = MultilingualWidget(
    ChoiceTextWidget(type),
    value.text ?? {},
  );

  return (
    <div className="single-choice-widget">
      <TextWidget
        id="config_key"
        title={intl.formatMessage(messages.config_key)}
        value={value.config_key}
        onChange={(n, v) => {
          //replace spacial characters and spaces with '_', and transform to uppercase
          onChange({
            ...value,
            [n]: v.replace(/[^A-Z0-9]/gi, '_').toUpperCase(),
          });
        }}
      />

      {type === 'profiling' && (
        <ArrayWidget
          id="referenceUrls"
          title={intl.formatMessage(messages.referenceUrls)}
          value={value.referenceUrls}
          onChange={(n, v) => {
            onChange({ ...value, [n]: v });
          }}
        />
      )}
      <TextMultilingualWidget
        id="text"
        title={intl.formatMessage(messages.text)}
        value={value.text}
        onChange={(n, v) => {
          onChange({ ...value, [n]: JSON.parse(v) });
        }}
        type={type}
      />
    </div>
  );
};

export default SingleChoiceWidget;
