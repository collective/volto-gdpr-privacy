import React from 'react';
import CookieGroupSettings from './CookieGroupSettings';

const CookieSettings = ({ preferences, setPreferences, panelConfig }) => {
  return (
    <div className="gdpr-privacy-settings">
      {/******** TECHNICAL ********/}
      <div className="settings-column technical">
        <CookieGroupSettings
          groupConfig={panelConfig.technical}
          disabled={true}
          preferences={preferences}
          setPreferences={setPreferences}
        />
      </div>

      {/******** PROFILING ********/}
      <div className="settings-column profiling">
        <CookieGroupSettings
          groupConfig={panelConfig.profiling}
          disabled={false}
          preferences={preferences}
          setPreferences={setPreferences}
          autofocus={true}
        />
      </div>
    </div>
  );
};

export default CookieSettings;
