const applyConfig = (config) => {
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
