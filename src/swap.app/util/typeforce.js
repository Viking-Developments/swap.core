import typeforce from 'typeforce'
import constants from '../constants'
import { ETH_TOKENS } from '../constants/COINS'

const check = (...args) => {
  try {
    return typeforce(...args)
  }
  catch (err) {
    console.error(err)
    return false
  }
}

const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value)

const isCoinName = (value) => Object.values(constants.COINS).map((v) => v.toLowerCase()).includes(value.toLowerCase())

const isCoinAddress = {
  [constants.COINS.eth]: (value) => typeof value === 'string' && /^0x[A-Fa-f0-9]{40}$/.test(value),
  [constants.COINS.btc]: (value) => typeof value === 'string' && /^[A-Za-z0-9]{26,35}$/.test(value),
  [constants.COINS.ghost]: (value) => typeof value === 'string' && /^[A-Za-z0-9]{26,35}$/.test(value),
  // [constants.COINS.usdt]: (value) => typeof value === 'string',
}

const isPublicKey = {
  [constants.COINS.eth]: '?String', // TODO we don't have / use eth publicKey
  [constants.COINS.btc]: (value) => typeof value === 'string' && /^[A-Za-z0-9]{66}$/.test(value),
  [constants.COINS.ghost]: (value) => typeof value === 'string' && /^[A-Za-z0-9]{66}$/.test(value),
  // [constants.COINS.usdt]: '?String', // TODO we don't have / use nim publicKey
}

Object.keys(ETH_TOKENS).forEach((tokenCode) => {
  isCoinAddress[ETH_TOKENS[tokenCode]] = (value) => typeof value === 'string' && /^0x[A-Fa-f0-9]{40}$/.test(value)
  isPublicKey[ETH_TOKENS[tokenCode]] = '?String'
})

export default {
  t: typeforce,
  check,
  isNumeric,
  isCoinName,
  isCoinAddress,
  isPublicKey,
}
