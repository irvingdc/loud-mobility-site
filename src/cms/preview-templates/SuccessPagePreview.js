import React from 'react'
import PropTypes from 'prop-types'
import { SuccessPageTemplate } from '../../templates/success-page'

const SuccessPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <SuccessPageTemplate
        content={data.content}
        icon={data.icon}
        isPreview={true}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

SuccessPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default SuccessPagePreview
