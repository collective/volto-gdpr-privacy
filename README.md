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

### Styling

If you want to change or adapt styles, you should start adapting [cookie-banner.less](src/components/CookieBanner/cookie-banner.less).

## Translations

This product has been translated into:

- Italian
- English
- French

Please, contribute to this project adding translations for your language.
