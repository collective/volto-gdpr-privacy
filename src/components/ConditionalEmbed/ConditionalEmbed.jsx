import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl, defineMessages } from 'react-intl';
import { displayBanner, updateGdprPrivacyConsent } from '../../actions';

import {
  usePanelConfigAndPreferences,
  GDPRCookies,
  getLocaleConf,
} from '../../helpers';

import './conditional-embed.css';

const messages = defineMessages({
  conditionalEmbedAcceptCookiesDefaultDescription: {
    id: 'volto-gdpr-privacy-conditional-embed-default-description',
    defaultMessage:
      'Please, accept {cookie_type} cookies to view this content.',
  },
  conditionalEmbedAcceptCookiesAcceptMessage: {
    id: 'volto-gdpr-privacy-conditional-embed-accept-message',
    defaultMessage: '{enable_cookie_button}, or {manage_preferences_button}',
  },
  specificCookieLink: {
    id: 'volto-gdpr-privacy-conditional-embed-specific-cookie-link',
    defaultMessage: 'Enable {cookie_type} cookies',
  },
  genericCookieLink: {
    id: 'volto-gdpr-privacy-conditional-embed-generic-cookie-link',
    defaultMessage: 'manage your cookie preferences',
  },
});
const ConditionalEmbed = ({ code, url, children }) => {
  const intl = useIntl();
  const cookies = new GDPRCookies();
  const { defaultPreferences, panelConfig } =
    usePanelConfigAndPreferences(cookies);

  const embed = code ?? url ?? '';
  const dispatch = useDispatch();

  const profilingConfig = panelConfig?.profiling?.choices?.filter(
    (c) => c?.referenceUrls?.length > 0,
  );
  const gdprPreferences = useSelector(
    (state) => state.gdprPrivacyConsent.preferences ?? defaultPreferences ?? {},
  );

  const [urlReferenceConfig, setUrlReferenceConfig] = useState(null);

  useEffect(() => {
    if (profilingConfig && !urlReferenceConfig) {
      let conditionalConfig = profilingConfig.filter(
        (c) =>
          c.referenceUrls.filter((r) => embed?.indexOf(r) >= 0)?.length > 0,
      );

      setUrlReferenceConfig(conditionalConfig?.[0] ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilingConfig, setUrlReferenceConfig, urlReferenceConfig, embed]);

  //return value
  let ret = <></>;
  let cookieConsentEnabled = Object.keys(panelConfig ?? {}).length > 0;
  let embedDisabled =
    cookieConsentEnabled &&
    urlReferenceConfig != null &&
    !gdprPreferences['prof_' + urlReferenceConfig.config_key];

  if (cookieConsentEnabled && __SERVER__) {
    return <div></div>; // it has to return something (and not a simple React.fragment) because client-rendering will replace it with next block confusing rendering
  }
  if (cookieConsentEnabled && !gdprPreferences && !urlReferenceConfig) {
    //we are in diffView (content history)
    return (
      <div
        className="volto-gdpr-embed-disabled"
        style={{ 'text-align': 'left' }}
      >
        <strong>Embed: </strong>
        <br />
        {embed}
      </div>
    );
  }

  if (cookieConsentEnabled && !gdprPreferences) {
    return <></>;
  }
  if (embedDisabled) {
    //embed disabled
    const text = getLocaleConf(urlReferenceConfig.text, intl.locale);
    const key = urlReferenceConfig.config_key;
    ret = (
      <div className="volto-gdpr-embed-disabled">
        {text?.conditional_embed_text ??
          intl.formatMessage(
            messages.conditionalEmbedAcceptCookiesDefaultDescription,
            { cookie_type: text.title },
          )}{' '}
        {intl.formatMessage(
          messages.conditionalEmbedAcceptCookiesAcceptMessage,
          {
            enable_cookie_button: (
              <button
                onClick={(e) => {
                  e.preventDefault();

                  cookies.set('prof_' + key, true);
                  dispatch(
                    updateGdprPrivacyConsent({
                      ...gdprPreferences,
                      ['prof_' + key]: true,
                    }),
                  );
                }}
              >
                {intl.formatMessage(messages.specificCookieLink, {
                  cookie_type: text.title,
                })}
              </button>
            ),
            manage_preferences_button: (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(displayBanner(true, true));
                }}
              >
                {intl.formatMessage(messages.genericCookieLink)}
              </button>
            ),
          },
        )}
      </div>
    );
  } else {
    ret = <>{children}</>;
  }

  return ret;
};

export default ConditionalEmbed;
