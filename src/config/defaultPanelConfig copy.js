export const defaultPanelConfig = {
    "it": {
           "description": "Questo sito utilizza i cookie tecnici bla bla bla.. Per i cookie di
                    profilazione scegli cosa vuoi fare cliccando sul pulsante impostazioni. Per                            accettare tutti i cookie di profilazione clicca su accetta tutti...",
           "technical": {
                    "title": "Cookie tecnici",
                    "description": "Il sito utilizza cookie tecnici per analizzare il traffico da e
                            verso il sito.. bla bla bla..",
                    "choices": [
                             {
                               "title": "Google Analytics",
                               "description": "I cookie di Google analytics sono usati per migliorare
                                     la qualità del nostro sito e il suo contenuto bla bla bla.. ",
                               "config_key": "GANLYTICS"
                             }
                   ]
           },
           "profiling": {
                    "title": "Cookie di profilazione",
                    "description": "Il sito utilizza cookie di profilazione per analizzare il
                             comportamente e le scelte degli utenti.. bla bla bla..",
                    "choices": [
                             {
                               "title": "Facebook pixel",
                               "description": "I cookie di Facebook pixel consentono di misurare,
                                      ottimizzare le campagne bla bla bla... ",
                               "config_key": "FACEBOOKPIXEL"
                             },
                             {
                               "title": "Youtube",
                               "description": "Cookie correlati a Youtube bla bla bla.. ",
                               "conditional_embed_text": "Per vedere il video, accetta i cookies di
                                      Youtube."
                             },
                             {
                               "title": "Facebook",
                               "description": "Cookie correlati a Facebook bla bla bla.. ",
                               "conditional_embed_text": "Per vedere il contenuto da Facebook, accetta
                                      i cookies di Facebook.",
                               "referenceUrls": ["facebook.com", "facebook.it"]
                             },
                             {
                               "title": "Juicer",
                               "description": "Cookie correlati a Juicer bla bla bla.. ",
                               "conditional_embed_text": "Per vedere il contenuto da Juicer, accetta i
                                      cookies di Facebook.",
                               "referenceUrls": ["juicer.com"]
                             }
                    ]
           }
    },
    "en": {}
  };
   