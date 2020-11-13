import { useEffect, useState, useMemo } from 'react'

import { getNetwork } from '../networks'
import { useAppState } from '../providers/AppState'

import BigNumber from '../lib/bigNumber'
import { useContractReadOnly } from './useContract'

import bancorAbi from '../abi/bancor.json'

export function useBondingCurvePrice(amount = 1, forwards = true) {

  const {
    totalSupply,
    collateralTreasuryBalance,
  } = useAppState()

  const bancorContract = useContractReadOnly(getNetwork().bancorFormula, bancorAbi)

  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState(new BigNumber(-1))

  const connectorWeight = 100000
  const RETRY_EVERY = 10000

  useEffect(() => {
    let cancelled = false
    let retryTimer

    if (collateralTreasuryBalance.eq(-1) || !bancorContract) {
      return
    }

    const getSalePrice = async () => {
      try {
        setLoading(true)
        const salePrice = await (forwards
          ? bancorContract.calculatePurchaseReturn(
              totalSupply.toString(10),
              collateralTreasuryBalance.toString(10),
              connectorWeight,
              amount
            )
          : bancorContract.calculateSaleReturn(
              totalSupply.toString(10),
              collateralTreasuryBalance.toString(10),
              connectorWeight,
              amount
            ))
        if (!cancelled) {
          setLoading(false)
          setPrice(salePrice)
        }
      } catch (err) {
        console.error(err)
        if (!cancelled) {
          retryTimer = setTimeout(getSalePrice, RETRY_EVERY)
        }
      }
    }

    getSalePrice()

    return () => {
      cancelled = true
      clearTimeout(retryTimer)
    }
  }, [
    amount,
    totalSupply,
    collateralTreasuryBalance,
    bancorContract,
    connectorWeight,
    forwards,
  ])

  return useMemo(() => price, [loading, price])
}
