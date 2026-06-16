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

  const isEmptyObj = (o) => Object.keys(o ?? {}).length === 0;

  useEffect(() => {
    if (profilingConfig && !urlReferenceConfig) {
      let conditionalConfig = profilingConfig.filter(
        (c) =>
          c.referenceUrls.filter((r) => embed?.indexOf(r) >= 0)?.length > 0,
      );

      setUrlReferenceConfig(conditionalConfig?.[0] ?? {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilingConfig, setUrlReferenceConfig, urlReferenceConfig, embed]);

  //return value
  let ret = <></>;
  let cookieConsentEnabled = Object.keys(panelConfig ?? {}).length > 0;
  let embedDisabled = true;
  if (
    cookieConsentEnabled &&
    urlReferenceConfig?.config_key &&
    gdprPreferences.hasOwnProperty('prof_' + urlReferenceConfig.config_key)
  ) {
    //non sono stati accettati i cookie di profilazione necessari per questo embed
    embedDisabled = !gdprPreferences['prof_' + urlReferenceConfig.config_key];
  } else if (
    cookieConsentEnabled &&
    urlReferenceConfig !== null &&
    isEmptyObj(urlReferenceConfig) &&
    !isEmptyObj(gdprPreferences)
  ) {
    //non sono previsti cookie di profilazione per questo embed ma è comunque abilitato il consenso cookie
    embedDisabled = false;
  } else if (cookieConsentEnabled && isEmptyObj(gdprPreferences)) {
    //non sono ancora state caricate le preferenze sui cookie, di default lo disabilitiamo per evitare di mostrare embed che potrebbero essere in violazione con le preferenze dell'utente
    embedDisabled = true;
  }

  if (cookieConsentEnabled && __SERVER__) {
    return <div></div>; // it has to return something (and not a simple React.fragment) because client-rendering will replace it with next block confusing rendering
  }
  if (
    cookieConsentEnabled &&
    isEmptyObj(gdprPreferences) &&
    !urlReferenceConfig
  ) {
    //we are in diffView (content history)
    return (
      <div className="volto-gdpr-embed-disabled" style={{ textAlign: 'left' }}>
        <strong>Embed: </strong>
        <br />
        {embed}
      </div>
    );
  }

  if (
    (cookieConsentEnabled && isEmptyObj(gdprPreferences)) ||
    (embedDisabled && !urlReferenceConfig?.config_key)
  ) {
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
                key="enable_cookie_button"
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
                key="manage_preferences_button"
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
