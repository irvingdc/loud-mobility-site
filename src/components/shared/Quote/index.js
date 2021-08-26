import React from 'react'
import * as classes from './index.module.less'
import bird from 'images/small_bird.png'

export default ({ content, author, image }) => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {content}
        <img src={bird} alt="Checkmark" />
      </div>
      <div className={classes.flex}>
        <div className={classes.picture}>
          <img src={image.publicURL || image} alt={author} />
        </div>
        <div className={classes.author}>{author}</div>
      </div>
    </div>
  )
}
