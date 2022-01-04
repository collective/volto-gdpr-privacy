/**
 * View html block.
 * @module components/manage/Blocks/HTML/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import ConditionalEmbed from '../../../../../components/ConditionalEmbed/ConditionalEmbed';

/**
 * View html block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <ConditionalEmbed code={data.html}>
    <div
      className="block html"
      dangerouslySetInnerHTML={{ __html: data.html }}
    />
  </ConditionalEmbed>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
