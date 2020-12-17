import React from 'react'
import { GU, Link, useTheme } from '@tecommons/ui'
import AccountModule from './Account/AccountModule'
import Layout from './Layout'

import logoSvg from '../assets/logo.svg'
import headerBackgroundSvg from '../assets/header-background.svg'
import logo from '../assets/logo-light-bg.svg'

function Header({ compact }) {
  const theme = useTheme()
  const Icon = (
    <Link href="/#" external={false}>
      <img src={logoSvg} height={compact ? 40 : 60} alt="" />
    </Link>
  )

  const headerItemsWidth = compact ? 'auto' : 25 * GU

  return (
    <header
      css={`
        background-color: ${theme.background};
        margin-bottom: ${compact ? `${2 * GU}px` : 0};
      `}
    >
      <div
        css={`
          /* background: url(${headerBackgroundSvg}) no-repeat; */
          background-size: 811px 600px;
          background-position: center;
          padding: ${
            compact ? `0px` : `0px 0 ${8.75 * GU}px 0`
          };
        `}
      >
        
          <div
            css={`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <div
              css={`
                width: 100%;
              `}
            >
              {compact ? Icon : <img src={logo} height="126" alt="" />}
            </div>
            {!compact && <div>{Icon}</div>}
            <div
              css={`
                width: ${headerItemsWidth}px;
              `}
            >
              <AccountModule compact={compact} />
            </div>
          </div>
        
      </div>
    </header>
  )
}

export default Header
