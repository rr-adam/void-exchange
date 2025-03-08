import { formatUnits, parseUnits } from 'ethers/lib/utils'

export function toFloat(value, decimals) {
  if (value)
    return parseFloat(formatUnits(value, decimals))
  else
    return value;
}

export function toBigNumber(value, decimals) {
  if (value)
    return parseUnits(value, decimals)
  else
    return value;
}