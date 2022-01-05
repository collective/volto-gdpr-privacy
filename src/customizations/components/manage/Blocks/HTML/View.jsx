/**
 * View html block.
 * @module components/manage/Blocks/HTML/View
 *
 * Customizations: added ConditionalEmbed wrapper component
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalEmbed } from '../../../../../';

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
