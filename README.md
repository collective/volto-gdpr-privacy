# volto-gdpr-privacy

Volto GDPR Privacy addon to manage user cookie consent.

It requires [collective.volto.gdprcookie](https://github.com/collective/collective.volto.gdprcookie).

Display a site banner if cookie configuration has changed or if 180 days have passed since last choice.
Cookies and banner configuration is available from Volto's controlpanel.

It also inserts in page a button to enable user to re-open the banner to change his preferences. You can hide this button from control panel.

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

You can configure it from GDPR cookie control panel.

#### Cookie expires

It's possibile to define a cookie expire time. By default it's 6 month, but you could change your expiration days in the control panel.

#### Configurable focus trap (from v.2.1.0)

Added a new configurable parameter called `focusTrapEnabled`, which defaults to true. This enables a focus trap provided by [react-focus-lock](https://www.npmjs.com/package/react-focus-lock)on cookie banner: user cannot tab their way out and has to perform an action via banner buttons to be able to navigate the site using keyboard.
Control panel configuration can be used to toggle this feature on or off.

#### Upgrade to v2.2.0

Before v2.2.0, the configuration could only be hardcoded in your project or theme config. [See the example here](src/config/defaultPanelConfig.js). If this configuration is set, it will still be used instead of the one from the controlpanel. In order to use the controlpanel configuration, you need to remove the hardcoded configuration from your project by setting `config.settings['volto-gdpr-privacy'].defaultPanelConfig = null;` in your project or theme config.

### Styling

If you want to change or adapt styles, you should start adapting [cookie-banner.less](src/components/CookieBanner/cookie-banner.less).

## Translations

This product has been translated into:

- Italian
- English
- French
- Spanish

Please, contribute to this project adding translations for your language.

## Versions

If you want to use it with a version of Volto <= 15.0.0-alpha.3, use volto-gdpr-privacy 1.3.0 version.
If you want to use it with a version of Volto < 15.7.0, use volto-gdpr-privacy 1.3.3 version.
If you want to use it with a version of Volto < 16, use volto-gdpr-privacy 1.3.11 version.
