export const getCookiesKeys = (config) => {
  return (
    config?.choices?.map((c) => c.config_key)?.filter((k) => k != null) ?? null
  );
};

export const getLocaleConf = (config, voltoConfig, locale) => {
  return config[locale] ?? config?.[voltoConfig.settings.defaultLanguage];
};
