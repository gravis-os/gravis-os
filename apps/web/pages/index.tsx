import React from 'react'
import type { NextPage } from 'next'
import LandingLayout from '@web/layouts/LandingLayout'
import homeBlocks from '../src/app/homeBlocks'

const Home: NextPage = (props) => (
  <LandingLayout
    blocks={homeBlocks}
    seo={{
      title: 'Home',
      description: 'Home page',
    }}
  />
)

export default Home
