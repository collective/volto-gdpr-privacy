import React from 'react';
import { Button as SemanticButton } from 'semantic-ui-react';

/*This component facilitates the customization of buttons*/

const Button = (props) => {
  let { className, ...otherProps } = props;
  className = (className || '') + ' gdpr-privacy-banner-button';

  return <SemanticButton {...otherProps} className={className} />;
};

export default Button;
