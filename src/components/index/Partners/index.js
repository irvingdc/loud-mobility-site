import React from 'react'
import * as classes from './index.module.less'

export default ({ partners }) => {
  return (
    <div className={classes.container}>
      <h3> {partners.heading} </h3>

      {partners.items?.map(({ image, alt }) => (
        <img alt={alt} key={alt} src={image?.publicURL || image} />
      ))}
    </div>
  )
}
