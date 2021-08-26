import React from 'react'
import PropTypes from 'prop-types'

const FooterPreview = ({ entry, widgetFor }) => {
  return <h3 style={{ padding: '0px 30px' }}>Preview not available.</h3>
}

FooterPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default FooterPreview
