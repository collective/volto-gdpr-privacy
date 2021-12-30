import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Radio } from 'semantic-ui-react';
import { getLocaleConf, getCookiesKeys } from '../../helpers/config';
import { groupIsAccepted } from '../../helpers/banner';
import CookieGroupSettings from './CookieGroupSettings';
import config from '@plone/volto/registry';

const messages = defineMessages({
  enabled: {
    id: 'volto-gdpr-privacy-enabled',
    defaultMessage: 'Enabled',
  },
  disabled: {
    id: 'volto-gdpr-privacy-disabled',
    defaultMessage: 'Disabled',
  },
});

const CookieSettings = ({ preferences, setPreferences, cookiesConfig }) => {
  const intl = useIntl();
  const technicalText = getLocaleConf(
    cookiesConfig.technical.text,
    config,
    intl.locale,
  );
  const profilingText = getLocaleConf(
    cookiesConfig.profiling.text,
    config,
    intl.locale,
  );

  const onChangeGroup = (groupConfig, value) => {
    const keys = getCookiesKeys(groupConfig);
    let newPreferences = { ...preferences };
    keys.forEach((k) => {
      newPreferences[k] = value;
    });

    setPreferences(newPreferences);
  };

  const profilingIsAccepted = groupIsAccepted(
    cookiesConfig.profiling,
    preferences,
  );
  const technicalIsAccepted = groupIsAccepted(
    cookiesConfig.technical,
    preferences,
  );

  return (
    <div className="gdpr-privacy-settings">
      {/******** TECHNICAL ********/}
      <div className="settings-column technical">
        <CookieGroupSettings
          groupConfig={cookiesConfig.technical}
          disabled={true}
          preferences={preferences}
          setPreferences={setPreferences}
        />
      </div>

      {/******** PROFILING ********/}
      <div className="settings-column profiling">
        <CookieGroupSettings
          groupConfig={cookiesConfig.profiling}
          disabled={false}
          preferences={preferences}
          setPreferences={setPreferences}
        />
      </div>
    </div>
  );
};

export default CookieSettings;
