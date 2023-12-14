import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { TextWidget, TextareaWidget } from '@plone/volto/components';

import SlateRichTextWidget from '@plone/volto-slate/widgets/RichTextWidget';

const messages = defineMessages({
  title: {
    id: 'gdprcookiesettings-choice-text-title',
    defaultMessage: 'Cookie title',
  },
  description: {
    id: 'gdprcookiesettings-choice-text-description',
    defaultMessage: 'Cookie description',
  },
  description_description: {
    id: 'gdprcookiesettings-choice-text-description_description',
    defaultMessage: 'Explain what this cookie does if the user enables it.',
  },
  conditional_embed_text: {
    id: 'gdprcookiesettings-choice-text-conditional_embed_text',
    defaultMessage: 'Conditional embed text',
  },
  conditional_embed_text_description: {
    id: 'gdprcookiesettings-choice-text-conditional_embed_text_description',
    defaultMessage:
      "This text is displayed as a placeholder if user hasn't accepted this cookie.",
  },
});

const ChoiceTextWidget =
  (type) =>
  ({ value, id, onChange }) => {
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
        {type === 'profiling' && (
          <TextareaWidget
            id="conditional_embed_text"
            title={intl.formatMessage(messages.conditional_embed_text)}
            description={intl.formatMessage(
              messages.conditional_embed_text_description,
            )}
            value={value.conditional_embed_text}
            onChange={(n, v) => {
              onChange(id, { ...value, [n]: v });
            }}
          />
        )}
      </>
    );
  };

export default ChoiceTextWidget;
