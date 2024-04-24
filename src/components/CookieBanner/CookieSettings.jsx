import React from 'react';
import CookieGroupSettings from './CookieGroupSettings';

const CookieSettings = ({ preferences, setPreferences, panelConfig }) => {
  const profiling_choices = panelConfig.profiling?.choices.filter(
    (c) => c.config_key?.length > 0,
  );
  return (
    <div className="gdpr-privacy-settings">
      {/******** TECHNICAL ********/}
      <div className="settings-column technical">
        <CookieGroupSettings
          id="technical"
          groupConfig={panelConfig.technical}
          disabled={true}
          preferences={preferences}
          setPreferences={setPreferences}
          oldStyle={panelConfig.oldStyle}
        />
      </div>

      {/******** PROFILING ********/}
      {profiling_choices.length > 0 && (
        <div className="settings-column profiling">
          <CookieGroupSettings
            id="profiling"
            groupConfig={panelConfig.profiling}
            disabled={false}
            preferences={preferences}
            setPreferences={setPreferences}
            autofocus={true}
            oldStyle={panelConfig.oldStyle}
          />
        </div>
      )}
    </div>
  );
};

export default CookieSettings;
