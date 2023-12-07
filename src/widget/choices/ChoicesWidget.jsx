import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Grid, Tab } from 'semantic-ui-react';
import { MultilingualWidget } from 'volto-multilingual-widget';
import { TextWidget, ArrayWidget } from '@plone/volto/components';
import SlateRichTextWidget from '@plone/volto-slate/widgets/RichTextWidget';
import ChoiceTextWidget from './ChoiceTextWidget';
import ReferenceUrlsWidget from './ReferenceUrlsWidget';
import SingleChoiceWidget from './SingleChoiceWidget';

const messages = defineMessages({
  cookies_choices: {
    id: 'gdprcookiesettings-cookies_choices',
    defaultMessage: 'Cookies',
  },
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

const DEFAULT_CHOICE = { config_key: '', referenceUrls: [], text: {} };
const srOnlyStyles = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: '0',
};

const ChoicesWidget = ({
  value = [DEFAULT_CHOICE],
  id,
  title,
  onChange,
  type,
}) => {
  //type: [technical, profiling]
  const intl = useIntl();

  const panes = value?.map((choice, i) => ({
    menuItem: choice.config_key,
    render: () => (
      <Tab.Pane id={`choice-${i}`} key={`choice-${i}`}>
        <label htmlFor={`choice-${i}`} style={srOnlyStyles}>
          {choice.config_key}
        </label>

        <SingleChoiceWidget
          value={choice}
          type={type}
          onChange={(v) => {
            let new_value = [...value];
            new_value[i] = v;
            onChange(id, new_value);
          }}
        />
      </Tab.Pane>
    ),
  }));

  return (
    <div className="choices-widget">
      <h4>{intl.formatMessage(messages.cookies_choices)}</h4>

      <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    </div>
  );
};

export default ChoicesWidget;
