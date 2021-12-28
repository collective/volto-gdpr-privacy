const defaultPanelConfig = {
  last_updated: '2021-11-30T17:33:28+00:00', //serve per sapere se ripresentare il banner all'utente nel caso siano cambiate le scelte.

  text: {
    //Testo che viene mostrato nel banner quando appare il banner
    it: {
      description:
        'Questo sito utilizza i cookie tecnici bla bla bla.. Per i cookie di profilazione scegli cosa vuoi fare cliccando sul pulsante impostazioni. Per accettare tutti i cookie di profilazione clicca su accetta tutti...',
    },
  },

  //technical cookies configurations
  technical: {
    //main title and text for the technical cookies column in banner-cookies-settings
    text: {
      it: {
        title: 'Cookie tecnici',
        description:
          'Il sito utilizza cookie tecnici per analizzare il traffico da e verso il sito.. bla bla bla..',
      },
    },

    //technical cookies
    choices: [
      {
        config_key: 'GANLYTICS', //reference to config.gdprPrivacyConfig keys
        text: {
          it: {
            title: 'Google Analytics',
            description:
              'I cookie di Google analytics sono usati per migliorare la qualità del nostro sito e il suo contenuto bla bla bla.. ',
          },
        },
      },
    ],
  },

  //profiling cookies configuration
  profiling: {
    text: {
      it: {
        title: 'Cookie di profilazione',
        description:
          'Il sito utilizza cookie di profilazione per analizzare il comportamente e le scelte degli utenti.. bla bla bla..',
      },
    },

    choices: [
      {
        config_key: 'FACEBOOKPIXEL',
        text: {
          it: {
            title: 'Facebook pixel',
            description:
              'I cookie di Facebook pixel consentono di misurare, ottimizzare le campagne bla bla bla... ',
          },
        },
      },
      {
        config_key: 'YOUTUBE',
        text: {
          it: {
            title: 'Youtube',
            description: 'Cookie correlati a Youtube bla bla bla.. ',
            //text to show in conditional embed if that cookies are not enabled
            conditional_embed_text:
              'Per vedere il video, accetta i cookies di Youtube.',
          },
        },
      },
      {
        config_key: 'FACEBOOK',
        //url releated to this cookies, used to conditionally embed iframes
        referenceUrls: ['facebook.com', 'facebook.it'],
        text: {
          it: {
            title: 'Facebook',
            description: 'Cookie correlati a Facebook bla bla bla.. ',
            conditional_embed_text:
              'Per vedere il contenuto da Facebook, accetta i cookies di Facebook.',
          },
        },
      },
      {
        config_key: 'JUICER',
        referenceUrls: ['juicer.com'],
        text: {
          it: {
            title: 'Juicer',
            description: 'Cookie correlati a Juicer bla bla bla.. ',
            conditional_embed_text:
              'Per vedere il contenuto da Juicer, accetta i cookies di Facebook.',
          },
        },
      },
    ],
  },
};

export default defaultPanelConfig;
