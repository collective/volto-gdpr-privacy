import CookieBanner from './components/CookieBanner/CookieBanner';
import GdprPrivacyManager from './components/GdprPrivacyManager/GdprPrivacyManager';
export { CookieBanner, GdprPrivacyManager };

const applyConfig = (config) => {
  config.settings.appExtras = [
    ...(config.settings.appExtras ?? []),
    {
      match: '',
      component: GdprPrivacyManager,
    },
  ];

  config.gdprPrivacyConfig = {
    GANALYTICS: {
      type: 'technical',
      //onAccept e onDecline not make sense for technical cookies, because these are active by default, and the user cannot change their activation
      defaultTitle:
        'Default title to show in the control panel and banner if nothing is set in the control panel',
      defaultDescription:
        'Default description to show in the control panel and banner if nothing is set in the control panel',
    },
    FACEBOOKPIXEL: {
      type: 'profiling',
      onAccept: (config) => {
        console.log('on accept facebook pixel');

        return <h1>Aggiunto all'accettazione</h1>;
      },
      onDecline: () => {},
      defaultTitle:
        'Default title to show in the control panel and banner if nothing is set in the control panel',
      defaultDescription:
        'Default description to show in the control panel and banner if nothing is set in the control panel',
    },
    // GTAGMANAGER:{....},
    // MATOMO:{....},
    //...your config keys...
  };
  return config;
};

export default applyConfig;
