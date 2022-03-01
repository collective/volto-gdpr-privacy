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
    defaultMessage:
      'Click {enable_cookie_button} to enable them, or click {manage_preferences_button} to manage your preferences.',
  },
  here: {
    id: 'volto-gdpr-privacy-conditional-embed-click-here',
    defaultMessage: 'here',
  },
});
const ConditionalEmbed = ({ code, url, children }) => {
  const intl = useIntl();
  const cookies = new GDPRCookies();
  const embed = code ?? url ?? '';
  const dispatch = useDispatch();

  const { defaultPreferences } = usePanelConfigAndPreferences(cookies);
  const profilingConfig = useSelector((state) =>
    state.gdprPrivacyConfig?.config?.profiling?.choices?.filter(
      (c) => c?.referenceUrls?.length > 0,
    ),
  );
  const gdprPreferences = useSelector(
    (state) => state.gdprPrivacyConsent.preferences ?? defaultPreferences,
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
  let ret = <>{children}</>;
  const embedDisabled =
    urlReferenceConfig != null &&
    !gdprPreferences[urlReferenceConfig.config_key];

  if (embedDisabled) {
    //embed disabled
    const text = getLocaleConf(urlReferenceConfig.text, intl.locale);
    const key = urlReferenceConfig.config_key;
    ret = (
      <div className="volto-gdpr-embed-disabled">
        {text.conditional_embed_text ??
          intl.formatMessage(
            messages.conditionalEmbedAcceptCookiesDefaultDescription,
            { cookie_type: key },
          )}{' '}
        {intl.formatMessage(
          messages.conditionalEmbedAcceptCookiesAcceptMessage,
          {
            enable_cookie_button: (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  cookies.set(key, true);
                  dispatch(
                    updateGdprPrivacyConsent({
                      ...gdprPreferences,
                      [key]: true,
                    }),
                  );
                }}
              >
                {intl.formatMessage(messages.here)}
              </button>
            ),
            manage_preferences_button: (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(displayBanner(true, true));
                }}
              >
                {intl.formatMessage(messages.here)}
              </button>
            ),
          },
        )}
      </div>
    );
  }

  return ret;
};

export default ConditionalEmbed;
