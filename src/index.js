import CookieBanner from './components/CookieBanner/CookieBanner';
import Button from './components/CookieBanner/ui/Button';
import Container from './components/CookieBanner/ui/Container';
import Checkbox from './components/CookieBanner/ui/Checkbox';
import GdprPrivacyManager from './components/GdprPrivacyManager/GdprPrivacyManager';
import ConditionalEmbed from './components/ConditionalEmbed/ConditionalEmbed';
import { gdprPrivacyConsent, gdprPrivacyConfig } from './reducers';
import defaultPanelConfig from './config/defaultPanelConfig.js';
import { displayBanner } from './actions';
export {
  CookieBanner,
  GdprPrivacyManager,
  ConditionalEmbed,
  Button,
  Container,
  Checkbox,
  displayBanner,
};

const applyConfig = (config) => {
  config.settings.appExtras = [
    ...(config.settings.appExtras ?? []),
    {
      match: '',
      component: GdprPrivacyManager,
    },
  ];

  config.settings.persistentReducers = [
    ...config.settings.persistentReducers,
    'gdprPrivacyConsent',
  ];
  config.addonReducers = {
    ...config.addonReducers,
    gdprPrivacyConsent,
    gdprPrivacyConfig,
  };

  //add api-expander: 'gdpr-config'
  let api_expanders = config.settings.apiExpanders.map(
    (ae) => (ae.GET_CONTENT = (ae.GET_CONTENT ?? []).push('gdpr-config')),
  );
  if (api_expanders.filter((ae) => ae.match === '').length === 0) {
    api_expanders.push({
      match: '',
      GET_CONTENT: ['gdpr-config'],
    });
  }

  config.settings.apiExpanders = [...api_expanders];

  //old settings [ToDo]: remove this
  config.settings['volto-gdpr-privacy'] = {
    defaultPanelConfig: defaultPanelConfig,
    settings: {
      /******
       * Example: dinamically include components based on user choices
       * ******/
      // FACEBOOKPIXEL: {
      //   component: () => {
      //     return <>Facebook pixel</>;
      //   },
      // },
      // GTAGMANAGER:{....},
      // MATOMO:{....},
      //...your config keys...
    },
  };
  return config;
};

export default applyConfig;
