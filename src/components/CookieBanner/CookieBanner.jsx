import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { Icon } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
import { isCmsUi } from '@plone/volto/helpers';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import { checkRichTextHasContent } from '../../helpers/richText';
import { updateGdprPrivacyConsent, displayBanner } from '../../actions';
import {
  usePanelConfigAndPreferences,
  getLocaleConf,
  getCookiesKeys,
  isPageSpeedBot,
} from '../../helpers';

import Button from 'volto-gdpr-privacy/components/CookieBanner/ui/Button';
import Container from 'volto-gdpr-privacy/components/CookieBanner/ui/Container';
import CookieSettings from './CookieSettings';
import FocusLock from 'react-focus-lock';

import './cookie-banner.css';

const messages = defineMessages({
  acceptTechnicalCookies: {
    id: 'volto-gdpr-privacy-acceptTechnicalCookies',
    defaultMessage: 'Only necessary cookies',
  },
  acceptTechnicalCookiesOnly: {
    id: 'volto-gdpr-privacy-acceptTechnicalCookiesOnly',
    defaultMessage: 'Accept necessary cookies',
  },
  acceptAllCookies: {
    id: 'volto-gdpr-privacy-acceptAllCookies',
    defaultMessage: 'Accept all',
  },
  changeSettings: {
    id: 'volto-gdpr-privacy-changeSettings',
    defaultMessage: 'Change settings',
  },
  acceptSettings: {
    id: 'volto-gdpr-privacy-acceptSettings',
    defaultMessage: 'Save my preferences',
  },
  close: {
    id: 'volto-gdpr-privacy-close',
    defaultMessage: 'Accept only necessary cookies and close',
  },
});

const CookieBanner = ({ cookies }) => {
  const intl = useIntl();
  const location = useLocation();
  const dispatch = useDispatch();
  const isCmsUI = isCmsUi(location.pathname);
  const gdpr_cookie_infos = useSelector(
    (state) =>
      state.content?.data?.['@components']?.['gdpr-cookie-settings'] ?? {},
  );

  const display = useSelector(
    (state) => state.gdprPrivacyConsent.display ?? false,
  );

  const showSettings = useSelector(
    (state) => state.gdprPrivacyConsent.displaySettings ?? false,
  );

  const { panelConfig, defaultPreferences } = usePanelConfigAndPreferences(
    cookies,
    display,
  );

  const [profilingKeys, setProfilingKeys] = useState(null);
  const [technicalKeys, setTechnicalKeys] = useState(null);
  const [focusTrapActive, setFocusTrapActive] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);

  const enabled = Object.keys(panelConfig ?? {}).length > 0;
  useEffect(() => {
    if (enabled) {
      if (!profilingKeys && !technicalKeys) {
        setProfilingKeys(getCookiesKeys(panelConfig.profiling) ?? []);
        setTechnicalKeys(getCookiesKeys(panelConfig.technical) ?? []);
      }
      // Need to set this only once. Calling update sets display
      // as false, thus component is not actually shown. Trap remains
      // active if set in config, will only change if config changes
      setFocusTrapActive(panelConfig.focusTrapEnabled);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelConfig]);

  useEffect(() => {
    setPreferences(defaultPreferences);
  }, [defaultPreferences]);

  useEffect(() => {
    if (enabled && defaultPreferences) {
      /*
      if user hasn't yet accepted cookies, or 'cookie_version' from control panel is changed,
      or configured 'cookie_expires' days from control panel have passed since the choice,
      it means that the cookie isn't set and we have to ask user to accept new version
      */
      if (cookies.get() === '') {
        dispatch(displayBanner(true));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelConfig, defaultPreferences]);

  const update = (newPreferences) => {
    //set cookies
    Object.keys(newPreferences).forEach((k) =>
      cookies.set(k, newPreferences[k]),
    );

    setPreferences(newPreferences);
    dispatch(updateGdprPrivacyConsent(newPreferences));
    dispatch(displayBanner(false));
  };

  const acceptTechnicalCookies = () => {
    let newPreferences = {};
    technicalKeys.forEach((k) => {
      newPreferences['tech_' + k] = true;
    });
    profilingKeys.forEach((k) => {
      newPreferences['prof_' + k] = false;
    });

    update(newPreferences);
  };

  const acceptAllCookies = () => {
    let newPreferences = {};
    technicalKeys.forEach((k) => {
      newPreferences['tech_' + k] = true;
    });
    profilingKeys.forEach((k) => {
      newPreferences['prof_' + k] = true;
    });

    update(newPreferences);
  };

  const acceptSettings = () => {
    const newPreferences = {
      ...preferences,
    };

    update(newPreferences);
  };

  const bannerText = getLocaleConf(panelConfig?.text, intl.locale) ?? {};

  if (__SERVER__ || isCmsUI || isPageSpeedBot()) {
    return <></>;
  }

  return display && enabled ? (
    <FocusLock disabled={!focusTrapActive}>
      <div className="gdpr-privacy-banner">
        <div className="gdpr-privacy-content-wrapper">
          <Button
            basic
            icon
            onClick={(e) => {
              e.preventDefault();
              acceptTechnicalCookies();
            }}
            className="close-button"
          >
            <Icon
              name={clearSVG}
              className="circled"
              aria-label={intl.formatMessage(messages.close)}
              size="30px"
              title={intl.formatMessage(messages.close)}
            />
          </Button>
          <Container className="gdpr-privacy-content">
            <div className="title">{bannerText.title}</div>
            {checkRichTextHasContent(bannerText.description) && (
              <div className="description">
                <TextBlockView data={{ value: bannerText.description }} />
              </div>
            )}

            {/********* SETTINGS *******/}
            {showSettings && (
              <CookieSettings
                preferences={preferences}
                setPreferences={setPreferences}
                panelConfig={panelConfig}
              />
            )}
            <div className="buttons">
              <Button
                color="black"
                onClick={(e) => {
                  e.preventDefault();
                  acceptTechnicalCookies();
                }}
              >
                {profilingKeys?.length > 0
                  ? intl.formatMessage(messages.acceptTechnicalCookies)
                  : intl.formatMessage(messages.acceptTechnicalCookiesOnly)}
              </Button>

              {profilingKeys?.length > 0 && (
                <>
                  <Button
                    className="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      acceptAllCookies();
                    }}
                  >
                    {intl.formatMessage(messages.acceptAllCookies)}
                  </Button>

                  {!showSettings ? (
                    <Button
                      color="black"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(displayBanner(true, true));
                      }}
                    >
                      {intl.formatMessage(messages.changeSettings)}
                    </Button>
                  ) : (
                    <Button
                      color="black"
                      onClick={(e) => {
                        e.preventDefault();
                        acceptSettings();
                      }}
                    >
                      {intl.formatMessage(messages.acceptSettings)}
                    </Button>
                  )}
                </>
              )}
            </div>
          </Container>
        </div>
      </div>
    </FocusLock>
  ) : (
    <></>
  );
};

export default CookieBanner;
