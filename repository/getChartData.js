async function getChartData (item, axios) {
  return await axios.get('panel/last-issue/' + item)
}
const labelsOfDataset = [
  {
    text: 'درخواست های تائید شده'
  },
  {
    text: 'درخواست های رد شده'
  },
  {
    text: 'درخواست های بررسی نشده'
  }
]
export default {
  getChartData,
  labelsOfDataset
}
