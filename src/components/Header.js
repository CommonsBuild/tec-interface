import React from 'react'
import { GU, Link } from '@1hive/1hive-ui'
import AccountModule from './Account/AccountModule'
import Layout from './Layout'

import theme from '../base/theme'
import logoSvg from '../assets/logo.svg'
import headerBackgroundSvg from '../assets/header-background.svg'
import logoTextSvg from '../assets/logoText.svg'

function Header({ compact }) {
  const Icon = (
    <Link href="/#" external={false}>
      <img src={logoSvg} height={compact ? 40 : 60} alt="" />
    </Link>
  )

  const headerItemsWidth = compact ? 'auto' : 25 * GU

  return (
    <header
      css={`
        background-color: ${theme.brand.primary.yellow};
        margin-bottom: ${compact ? `${2 * GU}px` : 0};
      `}
    >
      <div
        css={`
          /* background: url(${headerBackgroundSvg}) no-repeat; */
          background-size: 811px 600px;
          background-position: center;
          padding: ${
            compact ? `${3 * GU}px` : `${5.625 * GU}px 0 ${8.75 * GU}px 0`
          };
        `}
      >
        <Layout>
          <div
            css={`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <div
              css={`
                width: ${headerItemsWidth}px;
              `}
            >
              {compact ? Icon : <img src={logoTextSvg} height="50" alt="" />}
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
        </Layout>
      </div>
    </header>
  )
}

export default Header
