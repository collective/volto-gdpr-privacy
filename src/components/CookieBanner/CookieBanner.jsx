import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { Icon } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
import { isCmsUi } from '@plone/volto/helpers';
import { updateGdprPrivacyConsent, displayBanner } from '../../actions';
import {
  usePanelConfigAndPreferences,
  getLocaleConf,
  getCookiesKeys,
} from '../../helpers';

import Button from './ui/Button';
import Container from './ui/Container';
import CookieSettings from './CookieSettings';

import './cookie-banner.less';

const messages = defineMessages({
  acceptTechnicalCookies: {
    id: 'volto-gdpr-privacy-acceptTechnicalCookies',
    defaultMessage: 'Only necessary cookies',
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

const CookieBanner = ({ display = false, cookies }) => {
  const intl = useIntl();
  const location = useLocation();
  const dispatch = useDispatch();
  const isCmsUI = isCmsUi(location.pathname);
  const { panelConfig, defaultPreferences } = usePanelConfigAndPreferences(
    cookies,
  );

  const [profilingKeys, setProfilingKeys] = useState(null);
  const [technicalKeys, setTechnicalKeys] = useState(null);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (panelConfig) {
      if (!profilingKeys && !technicalKeys) {
        setProfilingKeys(getCookiesKeys(panelConfig.profiling));
        setTechnicalKeys(getCookiesKeys(panelConfig.technical));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelConfig]);

  useEffect(() => {
    setPreferences(defaultPreferences);
  }, [defaultPreferences]);

  useEffect(() => {
    if (panelConfig && defaultPreferences) {
      //if user hasn't yet accepted cookies, or cookies_version is changed, or 180 days have passed since the choice, ask user to accept new version
      let now = new Date();
      let lastUpdated = new Date(panelConfig.last_updated);
      let passedDays = Math.ceil((now - lastUpdated) / (1000 * 60 * 60 * 24));

      if (
        !defaultPreferences.cookies_version ||
        panelConfig.last_updated !== defaultPreferences.cookies_version ||
        passedDays >= 180
      ) {
        dispatch(displayBanner(true));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelConfig, defaultPreferences]);

  useEffect(() => {
    //on dispaly banner, remove cookie version
    if (display) {
      cookies.remove('cookies_version');
    }
  }, [display, cookies]);

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
    let newPreferences = { cookies_version: panelConfig.last_updated };
    technicalKeys.forEach((k) => {
      newPreferences[k] = true;
    });
    profilingKeys.forEach((k) => {
      cookies.set(k, false);
      newPreferences[k] = false;
    });

    update(newPreferences);
  };

  const acceptAllCookies = () => {
    let newPreferences = { cookies_version: panelConfig.last_updated };
    technicalKeys.forEach((k) => {
      newPreferences[k] = true;
    });
    profilingKeys.forEach((k) => {
      cookies.set(k, false);
      newPreferences[k] = true;
    });

    update(newPreferences);
  };

  const acceptSettings = () => {
    const newPreferences = {
      ...preferences,
      cookies_version: panelConfig.last_updated,
    };

    update(newPreferences);
  };

  const bannerText = getLocaleConf(panelConfig?.text, intl.locale);

  if (__SERVER__ || isCmsUI) {
    return <></>;
  }

  return display && panelConfig ? (
    <div className="gdpr-privacy-banner">
      <div className="gdpr-privacy-content-wrapper">
        <Button
          basic
          icon
          onClick={(e) => {
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
          <div className="description">{bannerText.description}</div>

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
                acceptTechnicalCookies();
              }}
            >
              {intl.formatMessage(messages.acceptTechnicalCookies)}
            </Button>

            {profilingKeys?.length > 0 && (
              <>
                <Button
                  className="primary"
                  onClick={(e) => {
                    acceptAllCookies();
                  }}
                >
                  {intl.formatMessage(messages.acceptAllCookies)}
                </Button>

                {!showSettings ? (
                  <Button
                    color="black"
                    onClick={(e) => {
                      setShowSettings(true);
                    }}
                  >
                    {intl.formatMessage(messages.changeSettings)}
                  </Button>
                ) : (
                  <Button
                    color="black"
                    onClick={(e) => {
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
  ) : (
    <></>
  );
};

export default CookieBanner;
