import CookieBanner from './components/CookieBanner/CookieBanner';
export { CookieBanner };
const applyConfig = (config) => {
  config.settings.appExtras = [
    ...(config.appExtras ?? []),
    {
      match: '',
      component: CookieBanner,
    },
  ];

  config.gdprPrivacyConfig = {
    GANALYTICS: {
      type: 'technical',
      onAccept: () => {},
      onDecline: () => {},
      defaultTitle:
        'Titolo di default da mostrare nel pannello di controllo e nel banner se non è impostato nulla nel pannello di controllo',
      defaultDescription:
        'Descrizione di default da mostrare nel pannello di controllo e nel banner se non è impostato nulla nel pannello di controllo',
    },
    FACEBOOKPIXEL: {
      // ...,
      type: 'profiling',
      // ...,
    },
    // GTAGMANAGER:{....},
    // MATOMO:{....},
    //...
  };
  return config;
};

export default applyConfig;
