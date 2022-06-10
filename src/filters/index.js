// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function progressOptions(val) {
  const options = {
    new: '未开始',
    processing: '进行中',
    finished: '已完成'
  }
  return options[val]
}

export function issueOptions(val) {
  const options = {
    delay: '已滞后',
    processing: '处理中',
    finished: '已解决'
  }
  return options[val]
}

export function getStatus(num) {
  const statusOptions = [{
    label: '正常',
    value: 0
  }, {
    label: '已完成',
    value: 1
  }, {
    label: '滞后风险',
    value: 2
  }, {
    label: '已滞后',
    value: 3
  }]
  const item = statusOptions.find(item => Number(item.value) === Number(num))
  return item ? item.label : ''
}

export function getRisk(val) {
  const options = [
    '低', '中', '高'
  ]
  return options[val]
}

export function getStauts(val) {
  const options = { delay: '#fe5400', finished: 'green', processing: 'yellow' }
  return options[val]
}

export function getKeystone(val) {
  const options = [
    '是', '否'
  ]
  return options[val]
}

export function getContent(num, type) {
  if (type === '正常' || type === '已完成' || type === '暂缓') {
    return ''
  }
  const result = { '已滞后': `${num}天`, '滞后预警': `计划时间<${num}天` }
  return `(${result[type]})`
}

export function getTaskContent(num, type) {
  if (type === '0' || type === '1') {
    return ''
  }
  const result = { '3': `${num}天`, '2': `计划时间<${num}天` }
  return `(${result[type]})`
}
