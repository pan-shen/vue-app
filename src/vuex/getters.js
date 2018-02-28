// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count

export function getMonth (state) {
  return state.month
}

export function getYear (state) {
  return state.year
}

export function getEid (state) {
  return state.eid
}

export function getImgName (state) {
  return state.name
}
