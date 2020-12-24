import React from 'react'
import { GU, Layout, useViewport } from '@tecommons/ui'
import { BREAKPOINTS } from '../styles/breakpoints'

function CustomLayout({ children }) {
  const { width: vw } = useViewport()
  console.log(vw);
  return (
    <Layout
      breakpoints={BREAKPOINTS}
      paddingBottom={0}
      css={`
        @media screen and (min-width: ${BREAKPOINTS.small}px) {
          margin-left: ${GU * 15.75}px;
          margin-right: ${GU * 7}px;
          width: ${vw - GU * 22.75}px;
        }
      `}
    >
      {children}
    </Layout>
  )
}

export default CustomLayout
