import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { CheckboxWidget } from '@plone/volto/components/manage/Widgets';
import { MultilingualWidget } from 'volto-multilingual-widget';

import MainTextWidget from './MainTextWidget';
import CookiesWidget from './CookiesWidget';
import './style.css';

const messages = defineMessages({
  focusTrapEnabled: {
    id: 'gdprcookiesettings-focusTrapEnabled',
    defaultMessage: 'Enable focus trap',
  },
  focusTrapDescription: {
    id: 'gdprcookiesettings-focusTrapDescription',
    defaultMessage:
      'If enabled, user cannot tab their way out and has to perform an action via banner buttons to be able to navigate the site using keyboard.',
  },
  text: {
    id: 'gdprcookiesettings-text',
    defaultMessage: 'Main banner text',
  },

  technical: {
    id: 'gdprcookiesettings-technical-cookies',
    defaultMessage: 'Technical cookies',
  },

  profiling: {
    id: 'gdprcookiesettings-profiling-cookies',
    defaultMessage: 'Profiling cookies',
  },
});

const MainTextMultilingualWidget = MultilingualWidget(MainTextWidget, {
  title: '',
  description: undefined, //undefined is needed for Slate editor
});

const GDPRCookieSettingsWidget = ({
  value,
  id,
  onChange,
  required,
  title,
  description,
}) => {
  const intl = useIntl();
  const [settings, setSettings] = useState(JSON.parse(value) ?? {});

  const handleChangeSettings = (value) => {
    setSettings(value);
    onChange(id, JSON.stringify(value));
  };

  return (
    <>
      <CheckboxWidget
        id="focusTrapEnabled"
        title={intl.formatMessage(messages.focusTrapEnabled)}
        description={intl.formatMessage(messages.focusTrapDescription)}
        value={settings.focusTrapEnabled ? settings.focusTrapEnabled : false}
        onChange={(name, value) => {
          handleChangeSettings({ ...settings, [name]: value });
        }}
      />
      <MainTextMultilingualWidget
        id="text"
        title={intl.formatMessage(messages.text)}
        value={settings.text}
        onChange={(name, value) => {
          handleChangeSettings({ ...settings, [name]: JSON.parse(value) });
        }}
      />

      <CookiesWidget
        id="technical"
        title={intl.formatMessage(messages.technical)}
        value={settings.technical}
        onChange={(name, value) => {
          handleChangeSettings({ ...settings, [name]: value });
        }}
      />

      <CookiesWidget
        id="profiling"
        title={intl.formatMessage(messages.profiling)}
        value={settings.profiling}
        onChange={(name, value) => {
          handleChangeSettings({ ...settings, [name]: value });
        }}
      />
    </>
  );
};

export default GDPRCookieSettingsWidget;
