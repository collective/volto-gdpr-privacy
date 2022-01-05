import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl, defineMessages } from 'react-intl';
import {
  getGdprPrivacyConfig,
  displayBanner,
  updateGdprPrivacyConsent,
} from '../../actions';

import { loadPreferences } from '../../helpers/banner';
import Cookies from '../../helpers/Cookies';
import { getLocaleConf } from '../../helpers/config';
import './conditional-embed.less';

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
  const cookies = new Cookies(true);
  const embed = code ?? url ?? '';
  const dispatch = useDispatch();

  const panelConfig = useSelector((state) => state.gdprPrivacyConfig);
  const [defaultPreferences, setDefaultPreferences] = useState(null);
  const profilingConfig = useSelector((state) =>
    state.gdprPrivacyConfig?.config?.profiling?.choices?.filter(
      (c) => c?.referenceUrls?.length > 0,
    ),
  );
  const gdprPreferences = useSelector(
    (state) => state.gdprPrivacyConsent.preferences ?? defaultPreferences,
  );
  const [referenceChoice, setReferenceChoice] = useState(null);

  useEffect(() => {
    if (!panelConfig.loaded && !panelConfig.loading) {
      dispatch(getGdprPrivacyConfig());
    }
    if (panelConfig.loaded && !panelConfig.loading && !defaultPreferences) {
      setDefaultPreferences(loadPreferences(cookies, panelConfig.config));
    }
  }, [dispatch, panelConfig]);

  useEffect(() => {
    if (profilingConfig && !referenceChoice) {
      let conditionalConfig = profilingConfig.filter(
        (c) =>
          c.referenceUrls.filter((r) => embed?.indexOf(r) >= 0)?.length > 0,
      );

      setReferenceChoice(conditionalConfig?.[0] ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilingConfig, setReferenceChoice, referenceChoice, embed]);

  //return value
  let ret = __SERVER__ ? <></> : <>{children}</>;
  const embedDisabled =
    referenceChoice != null && !gdprPreferences[referenceChoice.config_key];

  if (embedDisabled) {
    //embed disabled
    const text = getLocaleConf(referenceChoice.text, intl.locale);
    const key = referenceChoice.config_key;
    ret = (
      <div className="volto-gdpr-embed-disabled">
        {text.conditionalEmbedText ??
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
                  dispatch(displayBanner(true));
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
