import React from 'react'
import * as classes from './index.module.less'
import Content from 'components/blog/Content'
import Nav from 'components/shared/Nav'
import Footer from 'components/shared/Footer'
import { Link } from 'gatsby'

const post = ({ contentComponent, helmet, title, content }) => {
  const PostContent = contentComponent || Content
  return (
    <section className={classes.container}>
      <Nav />
      {helmet || ''}
      <div className={classes.white}>
        <Link to="/#blog">{'<'} Go Back</Link>
        <h1>{title}</h1>
        <PostContent content={content} />
      </div>
      <Footer />
    </section>
  )
}
export default post
