import React from 'react'
import { Box, GU, textStyle, useLayout, useTheme } from '@tecommons/ui'

import { useAppState } from '../providers/AppState'
import { useUniswapHnyPrice } from '../hooks/useUniswapHNYPrice'
import { formatDecimals, formatTokenAmount } from '../utils/token-utils'

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
    <Box padding={3 * GU}>
      <div
        css={`
          display: flex;
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
  const price = useUniswapHnyPrice()
  const currencyValue = value * price * currency.rate

  return (
    <>
      <Metric
        label={label}
        value={`${formatTokenAmount(value, token.decimals)} ${token.symbol}`}
      />
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

function TokenPrice({ currency }) {
  const theme = useTheme()
  return (
    <div>
      <p
        css={`
          ${textStyle('title2')};
          margin-bottom: ${0.5 * GU}px;
        `}
      >
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
    </div>
  )
}

export default Metrics
