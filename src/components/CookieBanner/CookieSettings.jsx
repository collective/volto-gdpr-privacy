import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Radio } from 'semantic-ui-react';
import { getLocaleConf, getCookiesKeys } from '../../helpers/config';
import { groupIsAccepted } from '../../helpers/banner';
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

  console.log('preferrences', preferences);
  return (
    <div className="gdpr-privacy-settings">
      {/******** TECHNICAL ********/}
      <div className="settings-column technical">
        <div className="settings-title">
          <div className="toggle-wrapper">
            {technicalText.title}{' '}
            <Radio
              toggle
              checked={technicalIsAccepted}
              disabled
              aria-label={
                technicalIsAccepted
                  ? intl.formatMessage(messages.enabled)
                  : intl.formatMessage(messages.disabled)
              }
              onChange={(e, { checked }) => {
                onChangeGroup(cookiesConfig.technical, checked);
              }}
            />
          </div>
        </div>

        {technicalText.description && (
          <div className="settings-description">
            {technicalText.description}
          </div>
        )}

        <div className="choices">
          {cookiesConfig.technical.choices.map((choiceConfig) => {
            const key = choiceConfig.config_key;
            const choice = getLocaleConf(
              choiceConfig.text,
              config,
              intl.locale,
            );

            return (
              <div className="choice" key={key}>
                <div className="choice-title">
                  <div className="toggle-wrapper">
                    {choice.title}
                    <Radio
                      toggle
                      checked={preferences[key]}
                      disabled
                      aria-label={
                        preferences[key]
                          ? intl.formatMessage(messages.enabled)
                          : intl.formatMessage(messages.disabled)
                      }
                      onChange={(e, { checked }) => {
                        setPreferences({
                          ...preferences,
                          [key]: checked,
                        });
                      }}
                    />
                  </div>
                </div>

                {choice.description && (
                  <div className="choice-description">{choice.description}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/******** PROFILING ********/}
      <div className="settings-column profiling">
        <div className="settings-title">
          <div className="toggle-wrapper">
            {profilingText.title}
            <Radio
              toggle
              checked={profilingIsAccepted}
              aria-label={
                profilingIsAccepted
                  ? intl.formatMessage(messages.enabled)
                  : intl.formatMessage(messages.disabled)
              }
              onChange={(e, { checked }) => {
                onChangeGroup(cookiesConfig.profiling, checked);
              }}
            />
          </div>
        </div>

        {profilingText.description && (
          <div className="settings-description">
            {profilingText.description}
          </div>
        )}

        <div className="choices">
          {cookiesConfig.profiling.choices.map((choiceConfig) => {
            const key = choiceConfig.config_key;
            const choice = getLocaleConf(
              choiceConfig.text,
              config,
              intl.locale,
            );

            return (
              <div className="choice" key={key}>
                <div className="choice-title">
                  <div className="toggle-wrapper">
                    {choice.title}
                    <Radio
                      toggle
                      checked={preferences[key]}
                      aria-label={
                        preferences[key]
                          ? intl.formatMessage(messages.enabled)
                          : intl.formatMessage(messages.disabled)
                      }
                      onChange={(e, { checked }) => {
                        setPreferences({
                          ...preferences,
                          [key]: checked,
                        });
                      }}
                    />
                  </div>
                </div>

                {choice.description && (
                  <div className="choice-description">{choice.description}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CookieSettings;
