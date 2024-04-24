/**
 * This is not imported by default, it is just here as an example. Create your own and set it in your config like this:
 * config.settings['volto-gdpr-privacy'].defaultPanelConfig = yourConfig;
 */
const defaultPanelConfig = {
  last_updated: '2022-01-11T10:36:28+00:00', //it is used to know whether to resubmit the banner to the user if the choices have changed.
  focusTrapEnabled: false,
  text: {
    //Text that is shown when the banner appears
    it: {
      title: 'Usiamo i cookies',
      description:
        "Questo sito utilizza i cookie tecnici di navigazione e di sessione per garantire un miglior servizio di navigazione del sito, e cookie analitici per raccogliere informazioni sull'uso del sito da parte degli utenti.  Utilizza anche cookie di profilazione dell'utente per fini statistici. I cookie di profilazione puoi decidere se abilitarli o meno cliccando sul pulsante 'Cambia le impostazioni'. Per saperne di più su come disabilitare i cookie oppure abilitarne solo alcuni, consulta la nostra <a href='/privacy-policy' target='_blank'>Cookie Policy.</a>",
    },
    en: {
      title: 'We use cookies',
      description:
        "This site uses technical navigation and session cookies to ensure a better site navigation service, and analytical cookies to collect information on the use of the site by users. It also uses user profiling cookies for statistical and remarketing purposes. For profiling cookies you can decide whether to enable them or not by clicking on the 'Change settings' button. To find out more, on how to disable cookies or enable only some of them, consult our <a href='/privacy-policy' target='_blank'>Cookie Policy</a>.",
    },
    fr: {
      title: 'We use cookies',
      description:
        "Ce site utilise des cookies techniques de navigation et de session pour assurer un meilleur service de navigation sur le site, et des cookies analytiques pour collecter des informations sur l'utilisation du site par les utilisateurs. Il utilise également des cookies de profilage des utilisateurs à des fins statistiques et de remarketing. Pour les cookies de profilage, vous pouvez décider de les activer ou non en cliquant sur le bouton « Modifier les paramètres ». Pour en savoir plus, sur la façon de désactiver les cookies ou d'en activer seulement certains, consultez notre <a href='/privacy-policy' target='_blank'>Politique des cookies</a>.",
    },
  },

  //technical cookies configurations
  technical: {
    //main title and text for the technical cookies column in banner-cookies-settings
    text: {
      it: {
        title: 'Cookie tecnici',
        description:
          'Il sito utilizza cookie tecnici per analizzare il traffico da e verso il sito. I cookies tecnici consento anche di fornire un migliore servizio di navigazione sul sito, e raccolgono informazioni di navigazione a questo scopo.',
      },
      en: {
        title: 'Technical cookies',
        description:
          'The site uses technical cookies to analyze traffic to and from the site. Technical cookies also allow us to provide a better navigation service on the site, and collect navigation information for this purpose.',
      },
      fr: {
        title: 'Cookies techniques',
        description:
          'Le site utilise des cookies techniques pour analyser le trafic vers et depuis le site. Les cookies techniques nous permettent également de fournir un meilleur service de navigation sur le site, et de collecter des informations de navigation à cette fin.',
      },
    },

    //technical cookies
    choices: [
      {
        config_key: 'GANALYTICS', //reference to config.gdprPrivacyConfig keys
        text: {
          it: {
            title: 'Google Analytics',
            description:
              "I cookie di Google Analytics sono usati per analizzare la navigazione sul sito al fine di migliorarla e fornire all'utente un'esperienza di navigazione migliore possibile.",
          },
          en: {
            title: 'Google Analytics',
            description:
              'Google Analytics cookies are used to analyze navigation on the site in order to improve it and provide the user with the best possible browsing experience.',
          },
          fr: {
            title: 'Google Analytics',
            description:
              "Les cookies de Google Analytics sont utilisés pour analyser la navigation sur le site afin de l'améliorer et offrir à l'utilisateur la meilleure expérience de navigation possible.",
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
          "Il sito utilizza cookie di profilazione per analizzare il comportamento e le scelte degli utenti al fine di proporre contenuti mirati corrispondenti al profilo dell'utente",
      },
      en: {
        title: 'Profiling cookies',
        description:
          "The site uses profiling cookies to analyze user behavior and choices in order to propose targeted content corresponding to the user's profile",
      },
      fr: {
        title: 'Cookies de profilage',
        description:
          "Le site utilise des cookies de profilage pour analyser le comportement et les choix de l'utilisateur afin de proposer un contenu ciblé correspondant au profil de l'utilisateur",
      },
    },

    choices: [
      {
        config_key: 'YOUTUBE',
        referenceUrls: ['youtube.com', 'youtube-nocookie.com', 'youtu.be'],
        text: {
          it: {
            title: 'Youtube',
            description:
              "I cookie di profilazione di Youtube permettono di mostrarti le pubblicità che potrebbero interessarti di più, fare analisi di accesso alla pagina e sul comportamento dell'utente, facilitare l'accesso ai servizi di Google.",
            //text to show in conditional embed if that cookies are not enabled
            conditional_embed_text:
              'Per vedere il video, accetta i cookie di Youtube.',
          },
          en: {
            title: 'Youtube',
            description:
              'Youtube profiling cookies allow you to show advertisements that may interest you the most, analyze page access and user behavior, facilitate access to Google services. ',
            //text to show in conditional embed if that cookies are not enabled
            conditional_embed_text:
              'To view the video, please accept Youtube cookies.',
          },
          fr: {
            title: 'Youtube',
            description:
              "Les cookies de profilage Youtube vous permettent d'afficher les publicités susceptibles de vous intéresser le plus, d'analyser l'accès aux pages et le comportement des utilisateurs, de faciliter l'accès aux services Google.",
            //text to show in conditional embed if that cookies are not enabled
            conditional_embed_text:
              'Pour voir la vidéo, veuillez accepter les cookies Youtube.',
          },
        },
      },
      {
        config_key: 'VIMEO',
        referenceUrls: ['vimeo.com'],
        text: {
          it: {
            title: 'Vimeo',
            description:
              "I cookie di profilazione di Vimeo permettono di fare analisi di accesso alla pagina e sul comportamento dell'utente, e di mostrarti le pubblicità che potrebbero interessarti di più.",
            //text to show in conditional embed if that cookies are not enabled
            conditional_embed_text:
              'Per vedere il video, accetta i cookie di Vimeo.',
          },
          en: {
            title: 'Vimeo',
            description:
              'Vimeo profiling cookies allow you to analyze page access and user behavior, and to show you the advertisements that may interest you the most.',
            //text to show in conditional embed if that cookies are not enabled
            conditional_embed_text:
              'To view the video, please accept Vimeo cookies.',
          },
          fr: {
            title: 'Vimeo',
            description:
              "Les cookies de profilage Vimeo vous permettent d'analyser l'accès aux pages et le comportement des utilisateurs, et de vous montrer les publicités qui pourraient vous intéresser le plus.",
            //text to show in conditional embed if that cookies are not enabled
            conditional_embed_text:
              'Pour voir la vidéo, veuillez accepter les cookies Vimeo.',
          },
        },
      },
      {
        config_key: 'GOOGLEMAPS',
        referenceUrls: ['google.com/maps'],
        text: {
          it: {
            title: 'Google Maps',
            description:
              "I cookie di profilazione di Google permettono di fare analisi di accesso alla pagina e sul comportamento dell'utente, e di mostrarti le pubblicità che potrebbero interessarti di più.",
            //text to show in conditional embed if that cookies are not enabled
            conditional_embed_text:
              'Per vedere la mappa, accetta i cookie di Google Maps.',
          },
          en: {
            title: 'Google Maps',
            description:
              'Google profiling cookies allow you to analyze page access and user behavior, and to show you the advertisements that may interest you the most.',
            //text to show in conditional embed if that cookies are not enabled
            conditional_embed_text:
              'To view map, please accept Google Maps cookies.',
          },
          fr: {
            title: 'Google Maps',
            description:
              "Les cookies de profilage Google vous permettent d'analyser l'accès aux pages et le comportement des utilisateurs, et de vous montrer les publicités qui pourraient vous intéresser le plus.",
            //text to show in conditional embed if that cookies are not enabled
            conditional_embed_text:
              'Pour afficher la carte, veuillez accepter les cookies de Google Maps.',
          },
        },
      },
      // {
      //   config_key: 'FACEBOOKPIXEL',
      //   text: {
      //     it: {
      //       title: 'Facebook Pixel',
      //       description:
      //         "I cookie di Facebook Pixel consentono di misurare, ottimizzare le campagne e le offerte di prodotti raccogliendo dati di profilazione dell'utente quali ad esempio sesso, età, interessi e altro.",
      //     },
      //     en: {
      //       title: 'Facebook Pixel',
      //       description:
      //         'Facebook Pixel cookies allow you to measure and optimize campaigns and product offers by collecting user profiling data such as gender, age, interests and more.',
      //     },
      //   },
      // },
      // {
      //   config_key: 'FACEBOOK',
      //   //url releated to this cookies, used to conditionally embed iframes
      //   referenceUrls: ['facebook.com', 'facebook.it'],
      //   text: {
      //     it: {
      //       title: 'Facebook',
      //       description: 'Cookie di profilazione correlati a Facebook. ',
      //       conditional_embed_text:
      //         'Per vedere i contenuti di Facebook, accetta i cookie relativi a Facebook.',
      //     },
      //     en: {
      //       title: 'Facebook',
      //       description: 'Related Facebook profiling cookies. ',
      //       conditional_embed_text:
      //         'To view Facebook content, please accept Facebook cookies.',
      //     },
      //   },
      // },
      // {
      //   config_key: 'JUICER',
      //   referenceUrls: ['juicer.com'],
      //   text: {
      //     it: {
      //       title: 'Juicer',
      //       description: 'Cookie di profilazione correlati a Juicer.',
      //       conditional_embed_text:
      //         'Per vedere il contenuto da Juicer, accetta i cookie di Juicer.',
      //     },
      //     en: {
      //       title: 'Juicer',
      //       description: 'Related profiling Juicer cookies.',
      //       conditional_embed_text:
      //         'To view the Juicer content, please accept Juicer cookies.',
      //     },
      //   },
      // },
    ],
  },
};

export default defaultPanelConfig;
