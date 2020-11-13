import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

import {
  useVaultBalance,
  useTokenBalances,
  useOrganzation,
  useAppData,
} from '../hooks/useOrgHooks'
import { useWallet } from './Wallet'
import { STAKE_PCT_BASE } from '../constants'

const AppStateContext = React.createContext()

function AppStateProvider({ children }) {
  const { account } = useWallet()
  const [organization, errorFetchingOrg]= useOrganzation()
  const {
    convictionVoting,
    installedApps,
    minThresholdStakePercentage,
    stakeToken,
    totalStaked,
    errorFetchingApp,
    requestToken,
    ...appData
  } = useAppData(organization)

  const vaultBalance = useVaultBalance(installedApps, requestToken, true)
  const collateralTreasuryBalance = useVaultBalance(installedApps, requestToken, false)

  const { balance, totalSupply } = useTokenBalances(account, stakeToken)

  const effectiveSupply = useMemo(() => {
    if (!(totalSupply && totalStaked && minThresholdStakePercentage)) {
      return
    }
    const percentageOfTotalSupply = totalSupply
      .multipliedBy(minThresholdStakePercentage)
      .div(STAKE_PCT_BASE)

    if (totalStaked.lt(percentageOfTotalSupply)) {
      return percentageOfTotalSupply
    }
    return totalStaked
  }, [totalSupply, totalStaked, minThresholdStakePercentage])

  const balancesLoading = vaultBalance.eq(-1) || totalSupply.eq(-1)
  const fetchingErrors = errorFetchingApp || errorFetchingOrg
  const appLoading = fetchingErrors ? false : !convictionVoting || balancesLoading || !effectiveSupply

  return (
    <AppStateContext.Provider
      value={{
        ...appData,
        accountBalance: balance,
        convictionVoting,
        effectiveSupply,
        fetchingErrors,
        installedApps,
        isLoading: appLoading,
        requestToken,
        stakeToken,
        totalStaked,
        totalSupply: totalSupply,
        vaultBalance,
        collateralTreasuryBalance,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

AppStateProvider.propTypes = {
  children: PropTypes.node,
}

function useAppState() {
  return useContext(AppStateContext)
}

export { AppStateProvider, useAppState }
