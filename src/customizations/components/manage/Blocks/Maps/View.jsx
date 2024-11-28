/**
 * View map block.
 * @module components/manage/Blocks/Maps/View
 *
 * Customizations: added ConditionalEmbed wrapper component
 */

import React, { useState, useEffect } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ConditionalEmbed } from '../../../../../';

const messages = defineMessages({
  EmbededGoogleMaps: {
    id: 'Embeded Google Maps',
    defaultMessage: 'Embeded Google Maps',
  },
});

/**
 * View image block class.
 * @class View
 * @extends Component
 */

const View = React.memo(({ data, intl }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, [data.url]);

  return data.url ? (
    <div
      className={cx(
        'block maps align',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <div
        className={cx('maps-inner', {
          'full-width': data.align === 'full',
        })}
      >
        <ConditionalEmbed code={data.url}>
          {isClient ? (
            <iframe
              title={intl.formatMessage(messages.EmbededGoogleMaps)}
              src={data.url}
              className="google-map"
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            <></>
          )}
        </ConditionalEmbed>
        )
      </div>
    </div>
  ) : (
    <></>
  );
});

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectIntl(View);
