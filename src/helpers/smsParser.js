export const SMS_TRANSFER =
  'Bancolombia le informa Transferencia por $80,000.00 desde cta *8996 a cta 0000003145578002. 14/11/2022 12:36. Inquietudes al 6045109095/018000931987.'
export const SMS_WITHDRAWAL =
  'Bancolombia le informa Retiro por $300.000,00 en CC_PLASOL2. Hora 16:09 12/11/2022 T.Deb *1654. Inquietudes al 6045109095/018000931987.'
export const SMS_PURCHASE =
  'Bancolombia le informa compra por $384.506,11 en HENRY TECH LLC 13:05. 05/10/2022 compra afiliada a T.Cred *4299. Inquietudes al 6045109095/01800931987.'

const getTypeFromSms = (sms) => {
  return sms.split(' ')[3]
}

const parseGetPlace = {
  compra: (sms) => {
    sms = sms.split('en ')[1]
    const place = sms.split(':')[0]
    return place.substring(0, place.length - 3)
  },
  retiro: (sms) => {
    sms = sms.split('en ')[1]
    const place = sms.split('.')[0]
    return place
  }
}

const parseGetRootAcc = {
  compra: (sms) => {
    sms = sms.split('*')[1]
    return sms.substring(0, 4)
  },
  retiro: (sms) => {
    sms = sms.split('*')[1]
    return sms.substring(0, 4)
  },
  transferencia: (sms) => {
    sms = sms.split('*')[1]
    return sms.substring(0, 4)
  }
}

const parseGetDestAcc = {
  transferencia: (sms) => {
    sms = sms.split('cta')[2].split('.')[0]
    return sms.substring(1)
  }
}

const parseGetDate = {
  compra: (sms) => {
    const date = sms.substring(sms.search('/20') - 12, sms.search('/20') + 5)
    const year = date.substring(13, 17)
    const month = date.substring(10, 12)
    const day = date.substring(7, 9)
    const hour = date.substring(0, 2)
    return new Date(year, month - 1, day, hour)
  },
  retiro: (sms) => {
    const date = sms.split('Hora')[1].substring(0, 17)
    const year = date.substring(13, 17)
    const month = date.substring(10, 12)
    const day = date.substring(7, 9)
    const hour = date.substring(1, 3)
    return new Date(year, month - 1, day, hour)
  },
  transferencia: (sms) => {
    const date = sms.split('cta')[2].split('.')[1].substring(1)
    const year = date.substring(6, 10)
    const month = date.substring(3, 5)
    const day = date.substring(0, 2)
    const hour = date.substring(11, 13)
    return new Date(year, month - 1, day, hour)
  }
}

const parseForTypes = {
  compra: (sms, type) => {
    const smsSplit = sms.split(' ')
    return {
      banck: smsSplit[0],
      value: smsSplit[5],
      place: parseGetPlace[type](sms),
      rootAcc: parseGetRootAcc[type](sms),
      destAcc: null,
      date: parseGetDate[type](sms)
    }
  },
  retiro: (sms, type) => {
    const smsSplit = sms.split(' ')
    return {
      banck: smsSplit[0],
      value: smsSplit[5],
      place: parseGetPlace[type](sms),
      rootAcc: parseGetRootAcc[type](sms),
      destAcc: null,
      date: parseGetDate[type](sms)
    }
  },
  transferencia: (sms, type) => {
    const smsSplit = sms.split(' ')
    return {
      banck: smsSplit[0],
      value: smsSplit[5],
      place: null,
      rootAcc: parseGetRootAcc[type](sms),
      destAcc: parseGetDestAcc[type](sms),
      date: parseGetDate[type](sms)
    }
  }
}

const parser = (sms) => {
  let result

  const type = getTypeFromSms(sms).toLocaleLowerCase()

  if (type) {
    result = parseForTypes[type](sms, type)
  }

  return { ...result, type }
}

export default parser
