import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import {
  Icon,
  Grid,
  Menu,
  Form,
  Button,
  Segment,
  Header,
} from 'semantic-ui-react';
import { TextWidget, CheckboxWidget } from '@plone/volto/components';
import { MultilingualWidget } from 'volto-multilingual-widget';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import SlateRichTextWidget from '@plone/volto-slate/widgets/RichTextWidget';
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

  cookie_prefix: {
    id: 'gdprcookiesettings-cookie_prefix',
    defaultMessage: 'Cookie prefix',
  },
  cookie_prefix_description: {
    id: 'gdprcookiesettings-cookie_prefix_description',
    defaultMessage:
      "Set a prefix for the cookie. By changing this value, the user's choices are invalidated, forcing the appearance of the banner and the related confirmation of the cookies. Useful when, for example, adding entries in technical cookies.",
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
  description: {},
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
      <TextWidget
        id="cookie_prefix"
        title={intl.formatMessage(messages.cookie_prefix)}
        description={intl.formatMessage(messages.cookie_prefix_description)}
        value={settings.cookie_prefix}
        onChange={(name, value) => {
          handleChangeSettings({ ...settings, [name]: value });
        }}
      />
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
