import CookieBanner from './components/CookieBanner/CookieBanner';
import { Button as CookieBannerButton } from './components/CookieBanner/ui/Button';
import { Container as CookieBannerContainer } from './components/CookieBanner/ui/Container';
import { Radio as CookieBannerRadio } from './components/CookieBanner/ui/Radio';
import GdprPrivacyManager from './components/GdprPrivacyManager/GdprPrivacyManager';
import ConditionalEmbed from './components/ConditionalEmbed/ConditionalEmbed';
import { gdprPrivacyConsent, gdprPrivacyConfig } from './reducers';
import defaultPanelConfig from './config/defaultPanelConfig.js';
export {
  CookieBanner,
  GdprPrivacyManager,
  ConditionalEmbed,
  CookieBannerButton,
  CookieBannerContainer,
  CookieBannerRadio,
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
