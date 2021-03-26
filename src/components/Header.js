import React from 'react'
import { GU, Link } from '@tecommons/ui'
import AccountModule from './Account/AccountModule'
import Layout from './Layout'

import beeSvg from '../assets/bee.svg'
import headerBackgroundSvg from '../assets/header-background.svg'
import logoSvg from '../assets/logotext.svg'

function Header({ compact }) {
  const BeeIcon = (
    <Link href="/#" external={false}>
      <img src={beeSvg} height={compact ? 40 : 60} alt="" />
    </Link>
  )

  const headerItemsWidth = compact ? 'auto' : 25 * GU

  return (
    <header
      css={`
        background: rgba(124, 224, 214, 0.6);
        margin-bottom: ${compact ? `${2 * GU}px` : 0};
      `}
    >
      <div
        css={`
          background: url(${headerBackgroundSvg}) no-repeat;
          background-size: 811px 600px;
          background-position: center;
          padding: ${compact
            ? `${3 * GU}px`
            : `${5.625 * GU}px 0 ${8.75 * GU}px 0`};
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
              {compact ? BeeIcon : <img src={logoSvg} height="30" alt="" />}
            </div>
            {!compact && <div>{BeeIcon}</div>}
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
