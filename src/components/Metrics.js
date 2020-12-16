import React from 'react'
import { Box, GU, textStyle, Link, useLayout, useTheme } from '@tecommons/ui'

import { formatTokenAmount, formatDecimals } from '../lib/token-utils'
import tokenIconSvg from '../assets/tec-token.svg'
import { useBondingCurvePrice } from '../hooks/useBondingCurvePrice'

const Metrics = React.memo(function Metrics({
  totalSupply,
  commonPool,
  onExecuteIssuance,
  stakeToken,
  requestToken,
  totalActiveTokens,
}) {
  const { layoutName } = useLayout()
  const compactMode = layoutName === 'small'

  return (
    <Box
      heading={stakeToken.name}
      css={`
        margin-bottom: ${2 * GU}px;
      `}
    >
      <div
        css={`
          display: ${compactMode ? 'block' : 'flex'};
          align-items: center;
          justify-content: space-around;
        `}
      >
        <div
          css={`
            display: flex;
            align-items: center;
            margin-bottom: ${(compactMode ? 2 : 0) * GU}px;
          `}
        >
          <img
            src={tokenIconSvg}
            height="60"
            width="60"
            alt=""
            onClick={onExecuteIssuance}
            css={`
              cursor: pointer;
            `}
          />
          {compactMode && <TokenPrice token={stakeToken} />}
        </div>
        {!compactMode && <TokenPrice token={stakeToken} />}
        <div>
          <TokenBalance
            label="Common Pool"
            value={commonPool}
            token={requestToken}
          />
        </div>
        <div>
          <TokenBalance
            label="Token Supply"
            value={totalSupply}
            token={stakeToken}
          />
        </div>
        <div>
          <TokenBalance
            label="Active"
            value={totalActiveTokens}
            token={stakeToken}
          />
        </div>
      </div>
    </Box>
  )
})

function Metric({ label, value, color }) {
  const theme = useTheme()
  return (
    <>
      <p
        css={`
          color: ${theme.contentSecondary};
          margin-bottom: ${1 * GU}px;
        `}
      >
        {label}
      </p>
      <span
        css={`
          ${textStyle('title2')};
          color: ${color || theme.content};
        `}
      >
        {value}
      </span>
    </>
  )
}

function TokenBalance({ label, token, value }) {
  const theme = useTheme()
  const usdValue = token.symbol !== 'xDAI' && token.symbol !== 'wxDAI' ?
    useBondingCurvePrice(value.toString(10), false):
    value

  return (
    <>
      <Metric label={label} value={`${formatTokenAmount(value, token.decimals)} ${token.symbol}`} />
      <div
        css={`
          color: ${theme.blue};
        `}
      >
        $ {formatTokenAmount(usdValue, token.decimals)}
      </div>
    </>
  )
}

function TokenPrice({ token }) {
  const price = useBondingCurvePrice(1e8, false)/1e8
  const theme = useTheme()
  return (
    <div>
      <Metric
        label={`${token.symbol} Price`}
        value={`$${formatDecimals(price, 8)}`}
        color={theme.blue}
      />
      <Link
        href={`https://convert.tecommons.org`}
        external
        css={`
          ${textStyle('body3')};
          text-decoration: none;
          display: flex;
        `}
      >
        Convert
      </Link>
    </div>
  )
}

export default Metrics
