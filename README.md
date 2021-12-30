# volto-gdpr-privacy

Volto GDPR Privacy addon to manage user consent.

To be used with mrs-developer, see [Volto docs](https://docs.voltocms.com/customizing/add-ons/) for further usage informations.

## Usage

Wherever you want to add the component, import and use it like this:

```jsx
import CookieBanner from 'volto-gdpr-privacy/GdprPrivacyManager';

const YourAppComponent = () => <GdprPrivacyManager />;
```

A suggested way is to use `appExtras` from settings object:

```jsx
export const settings = {
  ...defaultSettings,
  appExtras: [
    ...defaultSettings.appExtras,
    {
      match: '',
      component: GdprPrivacyManager,
    },
  ],
};
```

### Configuration

In your config provide this configuration:

```jsx
config.settings.gdprPrivacyConfig = {
  defaultPanelConfig: defaultPanelConfig, //default control panel configuration.
  settings: {
    /******
     * Example: technical cookies defaults
     * ******/

    GANALYTICS: {
      type: 'technical',
      //onAccept e onDecline not make sense for technical cookies, because these are active by default, and the user cannot change their activation
      defaultTitle:
        'Default title to show in the control panel if nothing is set in the control panel',
      defaultDescription:
        'Default description to show in the control panel if nothing is set in the control panel',
    },
    /******
     * Example: profiling cookies: dinamically include components based on user choices
     * ******/
    FACEBOOKPIXEL: {
      type: 'profiling',
      component: () => {
        return <>Facebook pixel</>;
      },
      defaultTitle:
        'Default title to show in the control panel if nothing is set in the control panel',
      defaultDescription:
        'Default description to show in the control panel if nothing is set in the control panel',
    },
    // GTAGMANAGER:{....},
    // MATOMO:{....},
    //...your config keys...
  },
};
```

### Styling

If you want to change or adapt styles, you should start adapting [cookie-banner.less](src/components/CookieBanner/cookie-banner.less).

## Translations

This product has been translated into:

- Italian
- English
- French

Please, contribute to this project adding translations for your language.
