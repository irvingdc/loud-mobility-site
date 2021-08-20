import React from 'react'
import PropTypes from 'prop-types'
import Footer from 'components/shared/Footer'

const FooterPreview = ({ entry, widgetFor }) => {
  return (
    <Footer/>
  )
}

FooterPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default FooterPreview
