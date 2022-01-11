import React, { useEffect, useRef } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { getLocaleConf, getCookiesKeys, groupIsAccepted } from '../../helpers';
import Radio from 'volto-gdpr-privacy/components/CookieBanner/ui/Radio';

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
  autofocus = false,
}) => {
  const intl = useIntl();

  const text = getLocaleConf(groupConfig.text, intl.locale);
  const isAccepted = groupIsAccepted(groupConfig, preferences);

  const onChangeGroup = (groupConfig, value) => {
    const keys = getCookiesKeys(groupConfig);
    let newPreferences = { ...preferences };
    keys.forEach((k) => {
      newPreferences[k] = value;
    });

    setPreferences(newPreferences);
  };

  const groupInputRef = useRef();

  useEffect(() => {
    if (autofocus && groupInputRef.current) {
      groupInputRef.current.children[0].children[0].focus();
    }
  }, []);

  return (
    <div className="settings-group-wrapper" role="radiogroup">
      <div className="settings-title">
        <div className="toggle-wrapper" ref={groupInputRef}>
          {text.title}
          <Radio
            toggle
            checked={isAccepted}
            disabled={disabled}
            aria-label={
              text.title + ' ' + isAccepted
                ? intl.formatMessage(messages.enabled)
                : intl.formatMessage(messages.disabled)
            }
            onChange={(e, { checked }) => {
              if (e.type !== 'change') {
                onChangeGroup(groupConfig, checked);
              }
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.code === 'Space' || e.keyCode === 32) {
                onChangeGroup(groupConfig, !isAccepted);
              }
            }}
          />
        </div>
      </div>

      {text.description && (
        <div
          className="settings-description"
          dangerouslySetInnerHTML={{ __html: text.description }}
        />
      )}

      <div className="choices">
        {groupConfig.choices.map((choiceConfig, i) => {
          const key = choiceConfig.config_key;
          const choice = getLocaleConf(choiceConfig.text, intl.locale);

          return (
            <div className="choice" key={key}>
              <div className="choice-title">
                <div className="toggle-wrapper">
                  {choice.title}
                  <Radio
                    tabIndex={i + 1}
                    toggle
                    checked={preferences[key]}
                    disabled={disabled}
                    aria-label={
                      choice.title + ' ' + preferences[key]
                        ? intl.formatMessage(messages.enabled)
                        : intl.formatMessage(messages.disabled)
                    }
                    onChange={(e, { checked }) => {
                      if (e.type !== 'change') {
                        setPreferences({
                          ...preferences,
                          [key]: checked,
                        });
                      }
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.code === 'Space' || e.keyCode === 32) {
                        setPreferences({
                          ...preferences,
                          [key]: !preferences[key],
                        });
                      }
                    }}
                  />
                </div>
              </div>

              {choice.description && (
                <div
                  className="choice-description"
                  dangerouslySetInnerHTML={{ __html: choice.description }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CookieGroupSettings;
