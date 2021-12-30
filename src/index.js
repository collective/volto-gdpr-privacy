import React from 'react';

import CookieBanner from './components/CookieBanner/CookieBanner';
import GdprPrivacyManager from './components/GdprPrivacyManager/GdprPrivacyManager';
import { gdprPrivacyConsent } from './reducers';
import defaultPanelConfig from './config/defaultPanelConfig.js';
export { CookieBanner, GdprPrivacyManager };

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
  };

  config.settings.gdprPrivacyConfig = {
    defaultPanelConfig: defaultPanelConfig,
    settings: {
      /******
       * Example: technical cookies defaults
       * ******/
      /*
      GANALYTICS: {
        type: 'technical',
        //onAccept e onDecline not make sense for technical cookies, because these are active by default, and the user cannot change their activation
        defaultTitle:
          'Default title to show in the control panel if nothing is set in the control panel',
        defaultDescription:
          'Default description to show in the control panel if nothing is set in the control panel',
      },*/
      /******
       * Example: profiling cookies: dinamically include components based on user choices
       * ******/
      /*FACEBOOKPIXEL: {
        type: 'profiling',
        component: () => {
          return <>Facebook pixel</>;
        },
        defaultTitle:
          'Default title to show in the control panel if nothing is set in the control panel',
        defaultDescription:
          'Default description to show in the control panel if nothing is set in the control panel',
      },*/
      // GTAGMANAGER:{....},
      // MATOMO:{....},
      //...your config keys...
    },
  };
  return config;
};

export default applyConfig;
