import React, { useEffect, useRef } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import { getLocaleConf, getCookiesKeys, groupIsAccepted } from '../../helpers';
import Checkbox from 'volto-gdpr-privacy/components/CookieBanner/ui/Checkbox';
import { checkRichTextHasContent } from '../../helpers/richText';

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
  id,
  groupConfig,
  disabled = false,
  preferences,
  setPreferences,
  autofocus = false,
  oldStyle = false,
}) => {
  const intl = useIntl();

  const text = getLocaleConf(groupConfig.text, intl.locale);
  const prefix = id === 'technical' ? 'tech_' : 'prof_';
  const isAccepted = groupIsAccepted(groupConfig, preferences, prefix);

  const onChangeGroup = (groupConfig, value) => {
    const keys = getCookiesKeys(groupConfig);
    let newPreferences = { ...preferences };

    keys.forEach((k) => {
      newPreferences[prefix + k] = value;
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
    <div className="settings-group-wrapper" role="group">
      <div className="settings-title">
        <div className="toggle-wrapper" ref={groupInputRef}>
          <Checkbox
            toggle
            checked={isAccepted}
            disabled={disabled}
            label={text.title}
            id={text.title.replace(' ', '')}
            aria-describedby={'desc_' + id}
            aria-label={
              text.title +
              ' ' +
              (isAccepted
                ? intl.formatMessage(messages.enabled)
                : intl.formatMessage(messages.disabled))
            }
            onClick={() => {
              if (isAccepted) {
                onChangeGroup(groupConfig, false);
              }
            }}
            onChange={(e, { checked }) => {
              onChangeGroup(groupConfig, checked);
            }}
          />
        </div>
      </div>

      {oldStyle && text.description && (
        <div
          id={'desc_' + id}
          className="settings-description"
          dangerouslySetInnerHTML={{ __html: text.description }}
        />
      )}
      {!oldStyle && checkRichTextHasContent(text.description) && (
        <div id={'desc_' + id} className="settings-description">
          <TextBlockView data={{ value: text.description }} />
        </div>
      )}

      <div className="choices">
        {groupConfig.choices.map((choiceConfig, i) => {
          const key = prefix + choiceConfig.config_key;
          const choice = getLocaleConf(choiceConfig.text, intl.locale);

          return (
            <div className="choice" key={key}>
              <div className="choice-title">
                <div className="toggle-wrapper">
                  <Checkbox
                    toggle
                    checked={preferences?.[key]}
                    disabled={disabled}
                    id={choice.title.replace(' ', '')}
                    label={choice.title}
                    aria-label={
                      choice.title +
                      ' ' +
                      (preferences?.[key]
                        ? intl.formatMessage(messages.enabled)
                        : intl.formatMessage(messages.disabled))
                    }
                    aria-describedby={'desc_' + id + '_' + i}
                    onClick={() => {
                      if (preferences?.[key]) {
                        setPreferences({
                          ...preferences,
                          [key]: false,
                        });
                      }
                    }}
                    onChange={(e, { checked }) => {
                      setPreferences({
                        ...preferences,
                        [key]: checked,
                      });
                    }}
                  />
                </div>
              </div>

              {oldStyle && choice.description && (
                <div
                  id={'desc_' + id + '_' + i}
                  className="choice-description"
                  dangerouslySetInnerHTML={{ __html: choice.description }}
                />
              )}
              {!oldStyle && checkRichTextHasContent(choice.description) && (
                <div id={'desc_' + id + '_' + i} className="choice-description">
                  <TextBlockView data={{ value: choice.description }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CookieGroupSettings;
