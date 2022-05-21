const provinceKey = 'provinceCache'
const cityPreKey = 'citiesOf_'

async function getProvince (pid, axios) {
  const res = await getProvinces(axios)
  return Promise.resolve(res[
    res.findIndex(value => value.id === pid)
  ])
}

async function getProvinces (axios) {
  const pvs = localStorage.getItem(provinceKey)
  let res = []
  try {
    if (pvs) {
      res = JSON.parse(pvs)
    } else { res = (await axios.get('/public/provinces')).data }
    localStorage.setItem(provinceKey, JSON.stringify(res))
  } catch {}
  return res
}

async function getCities (pid, axios) {
  let res = []
  if (pid) {
    const cts = localStorage.getItem(cityPreKey + pid)

    try {
      if (cts) {
        res = JSON.parse(cts)
      } else { res = (await axios.get('/public/cities/' + pid)).data }
      localStorage.setItem(cityPreKey + pid, JSON.stringify(res))
    } catch {}
  }
  return res
}

async function getBranches (pid, cid, axios) {
  if (pid && cid) {
    try {
      return (await axios.get('/public/branches/' + pid + '/' + cid)).data
    } catch {}
  }
  return []
}

async function getBranch (code, axios) {
  try {
    return (await axios.get('/public/branches/' + code)).data
  } catch {
    return []
  }
}
async function getOperation (code, axios) {
  try {
    return (await axios.get('operation/list')).data
  } catch {
    return []
  }
}

export default {
  getProvince,
  getProvinces,
  getCities,
  getBranch,
  getBranches,
  getOperation
}
