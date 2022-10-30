# volto-gdpr-privacy

Volto GDPR Privacy addon to manage user consent.
Display banner to user if gdprPrivacyConfiguration has changed or if 180 days have passed since last choice.
It also insert in page a button to enable user to re-open the banner to change his preferences.

For now, gdprPrivacyConfiguration is definible from config.
Next implementations step, is to make it configurable from Volto control panel.

To be used with mrs-developer, see [Volto docs](https://docs.voltocms.com/customizing/add-ons/) for further usage informations.
Otherwise, install it with:

```bash
yarn add volto-gdpr-privacy -W
```

## Usage

Wherever you want to add the component, import and use it like this:

```jsx
import { GdprPrivacyManager } from '@collective/volto-gdpr-privacy';

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

In your config file, provide a configuration to define:

- component to inject in page when user accept that type of cookie
- default title and description suggested in control panel

```jsx
config.settings['volto-gdpr-privacy'] = {
  defaultPanelConfig: defaultPanelConfig, //Default control-panel configuration.
  settings: {
    /******
     * Example: dinamically include components based on user choices
     * ******/
    FACEBOOKPIXEL: {
      component: () => {
        return <>Facebook pixel</>;
      },
    },
    // GTAGMANAGER:{....},
    // MATOMO:{....},
    //...your config keys...
  },
};
```

#### Cookie expires

It's possibile to define a cookie expire time. By default it's 6 month, but you could change your expiration days in the config:

```jsx
config.settings['volto-gdpr-privacy']?.cookieExpires = 1; //setting cookie expiration after 1 day
```

#### Panel configuration

Until control panel is not available, a default control-panel configuration is used.
You could extend [defaultPanelConfig.js](src/config/defaultPanelConfig.js) configuration, or create your configuration and pass it in the config file:

```jsx
config.settings['volto-gdpr-privacy] = {
  defaultPanelConfig: defaultPanelConfig, //Default control-panel configuration.
  //...
  },
```

### Styling

If you want to change or adapt styles, you should start adapting [cookie-banner.less](src/components/CookieBanner/cookie-banner.less).

## Translations

This product has been translated into:

- Italian
- English
- French

Please, contribute to this project adding translations for your language.

## Versions

If you want to use it with a version of Volto <= 15.0.0-alpha.3, use volto-gdpr-privacy 1.3.0 version.
If you want to use it with a version of Volto < 15.7.0, use volto-gdpr-privacy 1.3.3 version.
If you want to use it with a version of Volto < 16, use volto-gdpr-privacy 1.3.11 version.
