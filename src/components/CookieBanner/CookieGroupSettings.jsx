import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { getLocaleConf, getCookiesKeys } from '../../helpers/config';
import { groupIsAccepted } from '../../helpers/banner';
import Radio from './ui/Radio';
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

const CookieGroupSettings = ({
  groupConfig,
  disabled = false,
  preferences,
  setPreferences,
}) => {
  const intl = useIntl();

  const text = getLocaleConf(groupConfig.text, config, intl.locale);
  const isAccepted = groupIsAccepted(groupConfig, preferences);

  const onChangeGroup = (groupConfig, value) => {
    const keys = getCookiesKeys(groupConfig);
    let newPreferences = { ...preferences };
    keys.forEach((k) => {
      newPreferences[k] = value;
    });

    setPreferences(newPreferences);
  };

  return (
    <div className="settings-group-wrapper">
      <div className="settings-title">
        <div className="toggle-wrapper">
          {text.title}
          <Radio
            toggle
            checked={isAccepted}
            disabled={disabled}
            aria-label={
              isAccepted
                ? intl.formatMessage(messages.enabled)
                : intl.formatMessage(messages.disabled)
            }
            onChange={(e, { checked }) => {
              onChangeGroup(groupConfig, checked);
            }}
          />
        </div>
      </div>

      {text.description && (
        <div className="settings-description">{text.description}</div>
      )}

      <div className="choices">
        {groupConfig.choices.map((choiceConfig) => {
          const key = choiceConfig.config_key;
          const choice = getLocaleConf(choiceConfig.text, config, intl.locale);

          return (
            <div className="choice" key={key}>
              <div className="choice-title">
                <div className="toggle-wrapper">
                  {choice.title}
                  <Radio
                    toggle
                    checked={preferences[key]}
                    disabled={disabled}
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
  );
};

export default CookieGroupSettings;
