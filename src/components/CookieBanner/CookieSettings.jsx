import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Radio } from 'semantic-ui-react';
import { getLocaleConf, getCookiesKeys } from '../../helpers/config';
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

  return (
    <div className="gdpr-privacy-settings">
      {/******** TECHNICAL ********/}
      <div className="settings-column technical">
        <div className="settings-title">
          <div className="toggle-wrapper">
            {technicalText.title}{' '}
            <Radio
              toggle
              checked={true}
              disabled
              aria-label={intl.formatMessage(messages.enabled)}
              size="big"
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
            const choice = getLocaleConf(
              choiceConfig.text,
              config,
              intl.locale,
            );

            return (
              <div className="choice">
                <div className="choice-title">
                  <div className="toggle-wrapper">
                    {choice.title}
                    <Radio
                      toggle
                      checked={true}
                      disabled
                      aria-label={intl.formatMessage(messages.enabled)}
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
            {profilingText.title}{' '}
            <Radio
              toggle
              // checked={false}
              // aria-label={intl.formatMessage(messages.enabled)}
              size="big"
              // onChange={(e, { value }) => {
              //   console.log('activate all profiling cookies');
              // }}
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
            const choice = getLocaleConf(
              choiceConfig.text,
              config,
              intl.locale,
            );

            return (
              <div className="choice">
                <div className="choice-title">
                  <div className="toggle-wrapper">
                    {choice.title}
                    <Radio
                      toggle
                      // checked={true}
                      // aria-label={intl.formatMessage(messages.enabled)}
                      // onChange={(e, { value }) => {
                      //   console.log('activate all profiling cookies');
                      // }}
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
