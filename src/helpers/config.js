import config from '@plone/volto/registry';

export const getCookiesKeys = (config) => {
  return (
    config?.choices
      ?.map((c) => c.config_key)
      ?.filter((k) => k != null && k?.length > 0) ?? null
  );
};

export const getLocaleConf = (privacyConfig, locale) => {
  return privacyConfig
    ? privacyConfig[locale] ?? privacyConfig?.[config.settings.defaultLanguage]
    : null;
};
