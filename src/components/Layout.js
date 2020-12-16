import React from 'react'
import { Layout, useViewport } from '@tecommons/ui'
import { BREAKPOINTS } from '../styles/breakpoints'

function CustomLayout({ children }) {
  const { width: vw } = useViewport()
  return (
    <Layout
      breakpoints={BREAKPOINTS}
      parentWidth={vw}
      paddingBottom={0}
      css={`
        min-width: auto;
      `}
    >
      {children}
    </Layout>
  )
}

export default CustomLayout
