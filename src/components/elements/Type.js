import React from 'react';
import Box from 'ui-box';
import PropTypes from 'prop-types';

export const Text = props => {
  const truncateProps = {};
  if (props.truncate) {
    truncateProps.overflow = 'hidden';
    truncateProps.maxWidth = '100%';
    truncateProps.textOverflow = 'ellipsis';
    truncateProps.whiteSpace = 'nowrap';
    if (typeof props.children === 'string') {
      truncateProps.title = props.children;
    }
    if (props.is === 'span') {
      truncateProps.is = 'div';
    }
  }
  return <Box is={props.is} {...truncateProps} {...props} />;
};

Text.propTypes = {
  ...Box.propTypes,
  light: PropTypes.bool,
  bold: PropTypes.bool,
};

export const H1 = props => <Text {...props} />;
H1.propTypes = Text.propTypes;
H1.defaultProps = {
  ...Text.defaultProps,
  is: 'h1',
  fontSize: '2rem',
  fontWeight: 400,
  letterSpacing: '-0.0025rem',
  lineHeight: 1.5,
  marginTop: 0,
  marginBottom: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};
H1.displayName = 'H1';

export const H2 = props => <Text {...props} />;
H2.propTypes = Text.propTypes;
H2.defaultProps = {
  ...Text.defaultProps,
  is: 'h2',
  fontSize: '1.5rem',
  fontWeight: 800,
  letterSpacing: 0,
  lineHeight: 1.5,
  marginTop: 0,
  marginBottom: 0,
};
H2.displayName = 'H2';

export const H3 = props => <Text {...props} />;
H3.propTypes = Text.propTypes;
H3.defaultProps = {
  ...Text.defaultProps,
  is: 'h3',
  fontSize: '1.125rem',
  fontWeight: 800,
  letterSpacing: 0,
  lineHeight: 1.5,
  marginTop: 0,
  marginBottom: 0,
};
H3.displayName = 'H3';

export const P = props => <Text {...props} />;
P.propTypes = Text.propTypes;
P.defaultProps = {
  ...Text.defaultProps,
  fontFamily: 'inherit',
  is: 'p',
  fontSize: '1rem',
  fontWeight: 400,
  letterSpacing: 0,
  lineHeight: 1.5,
  marginTop: 0,
  marginBottom: 16,
};
P.displayName = 'P';

export const Caption = props => <Text {...props} />;
Caption.propTypes = Text.propTypes;
Caption.defaultProps = {
  ...Text.defaultProps,
  is: 'p',
  fontSize: '0.875rem',
  fontWeight: 400,
  letterSpacing: 0,
  lineHeight: 1.7,
  marginTop: 0,
  marginBottom: 0,
};
Caption.displayName = 'Caption';
