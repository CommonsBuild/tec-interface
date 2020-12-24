import React from 'react'
import { GU, Link, useTheme } from '@tecommons/ui'
import AccountModule from './Account/AccountModule'

import headerBackgroundSvg from '../assets/header-background.svg'
import logo from '../assets/logo-light-bg.svg'
import logoFullText from '../assets/tecFullTextLogo.svg'
import logoSvg from '../assets/logo.svg'

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
            compact ? `0px` : `0px 0 ${4 * GU}px 0`
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
              { compact ? 
                Icon 
              :
                <div css={`
                  display: flex;
                  align-items: center;
                `}>
                  <img src={logo} height="126" alt="" />
                  <img src={logoFullText} alt="" css={`
                    height: 50px;
                    margin-left: ${4.2 * GU}px;
                  `}  />
                </div>
              }
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
