import React from 'react'
import { Box, GU, textStyle, useLayout, useTheme } from '@1hive/1hive-ui'

<<<<<<< HEAD
import { formatTokenAmount, formatDecimals } from '../lib/token-utils'
import tokenIconSvg from '../assets/tec-token.svg'
import { useBondingCurvePrice } from '../hooks/useBondingCurvePrice'
=======
import { useAppState } from '../providers/AppState'
import { useUniswapHnyPrice } from '../hooks/useUniswapHNYPrice'
import { formatDecimals, formatTokenAmount } from '../utils/token-utils'

import honeySvg from '../assets/honey.svg'
>>>>>>> upstream_1hive/master

const Metrics = React.memo(function Metrics({
  commonPool,
  onExecuteIssuance,
  totalActiveTokens,
  totalSupply,
}) {
  const { layoutName } = useLayout()
  const compactMode = layoutName === 'small'
  const { requestToken, stakeToken } = useAppState()
  const currency = {
    name: 'USD',
    symbol: '$',
    rate: 1,
  }

  return (
<<<<<<< HEAD
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
=======
    <Box padding={3 * GU}>
      <div
        css={`
          display: flex;
>>>>>>> upstream_1hive/master
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
          <TokenPrice currency={currency} />
        </div>
        <div>
          <TokenBalance
            label="Common Pool"
            value={commonPool}
            token={requestToken}
            currency={currency}
          />
        </div>
        <div>
          <TokenBalance
            label="Token Supply"
            value={totalSupply}
            token={stakeToken}
            currency={currency}
          />
        </div>
        <div>
          <TokenBalance
            label="Active"
            value={totalActiveTokens}
            token={stakeToken}
            currency={currency}
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
          margin-bottom: ${0.5 * GU}px;
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

function TokenBalance({ label, token, value, currency }) {
  const theme = useTheme()
<<<<<<< HEAD
  const usdValue = token.symbol !== 'xDAI' && token.symbol !== 'wxDAI' ?
    useBondingCurvePrice(value.toString(10), false):
    value
=======
  const price = useUniswapHnyPrice()
  const currencyValue = value * price * currency.rate
>>>>>>> upstream_1hive/master

  return (
    <>
      <Metric label={label} value={`${formatTokenAmount(value, token.decimals)} ${token.symbol}`} />
      <div
        css={`
          color: ${theme.blue};
        `}
      >
        {currency.symbol} {formatTokenAmount(currencyValue, token.decimals)}
      </div>
    </>
  )
}

<<<<<<< HEAD
function TokenPrice({ token }) {
  const price = useBondingCurvePrice(1e8, false)/1e8
=======
function TokenPrice({ currency }) {
>>>>>>> upstream_1hive/master
  const theme = useTheme()
  return (
    <div>
<<<<<<< HEAD
      <Metric
        label={`${token.symbol} Price`}
        value={`$${formatDecimals(price, 8)}`}
        color={theme.blue}
      />
      <Link
        href={`https://convert.tecommons.org`}
        external
=======
      <p
>>>>>>> upstream_1hive/master
        css={`
          ${textStyle('title2')};
          margin-bottom: ${0.5 * GU}px;
        `}
      >
<<<<<<< HEAD
        Convert
      </Link>
=======
        HNY Price
      </p>
      <span
        css={`
          ${textStyle('title2')};
          color: ${theme.green};
        `}
      >
        {currency.symbol}
        {formatDecimals(price * currency.rate, 2)}
      </span>
>>>>>>> upstream_1hive/master
    </div>
  )
}

export default Metrics
