// import Firebase from 'firebase'
import { EventEmitter } from 'events'
import AppConstants from '../constants/AppConstants'
import Functions from '../common'
// import moment from 'moment'
const store = new EventEmitter()

export default store

store.start = start => {
  if (start === true) {
    Functions.openCustomURLinIFrame(AppConstants.IOS_START)
  }
}
store.states = {}
store.complete = () => {
  if (Object.getOwnPropertyNames(store.states).length === 2) {
    if (store.states.html5State === true && store.states.htmlCommentState === true) {
      Functions.openCustomURLinIFrame(AppConstants.IOS_FINISH + 'success')
      var hidUrl = AppConstants.HTML5_ID + Functions.getUrlParameter('nid')
      Functions.openCustomURLinIFrame(hidUrl)
    } else {
      Functions.openCustomURLinIFrame(AppConstants.IOS_FINISH + 'failure')
    }
  }
}
store.isComment = () => {
  Functions.openCustomURLinIFrame(AppConstants.IS_COMMENT + 'true')
}

try {
  store.apptype = Functions.getUrlParameter('apptype')
  store.aid = Functions.getUrlParameter('aid')
  store.uid = Functions.getUrlParameter('uid')
  if (!Functions.isEmpty(store.aid)) {
  } else {
    throw new Error('store.aid is empty!')
  }
  if (!Functions.isEmpty(store.uid)) {
  } else {
    throw new Error('store.uid is empty!')
  }
  if (!Functions.isEmpty(store.apptype)) {
  } else {
    throw new Error('store.apptype is empty!')
  }
} catch (err) {
  if (store.apptype === 'ios') {
    Functions.openCustomURLinIFrame(AppConstants.IOS_FINISH + 'failure')
  } else if (store.apptype === 'android') {
    window.AndroidApp.onFinish(String(false))
  }
}

store.pageInitArray = []
store.pageInitState = false
store.num = 1

store.setNum = num => {
  store.num = num
}
// 组件刷新start
store.componentsReloadState = (state, componentsName) => {
  if (state === 'start') {
    store.talkToApp('start', componentsName)
    // console.log(componentsName + '刷新开始加载')
  } else if (state === 'success') {
    store.talkToApp('success', componentsName)
    // console.log(componentsName + '刷新完成')
  } else if (state === 'fail') {
    store.talkToApp('fail', componentsName)
    // console.log(componentsName + '刷新失败')
  }
}
// 组件刷新end
// 页面开始加载start
store.updatePageInitstate = state => {
  store.pageInitState = true
  if (store.pageInitState === true) {
    // console.log('页面开始加载')
    if (store.apptype === 'ios') {
      Functions.openCustomURLinIFrame(AppConstants.IOS_START)
    } else if (store.apptype === 'android') {
      return window.AndroidApp.onStart()
    }
  }
}
// 页面开始加载end
// 页面完成加载start
store.componentsInitstate = state => {
  store.pageInitArray.push(state)
  if (store.pageInitArray.length === 4) {
    // console.log(store.pageInitArray)
    if (store.pageInitArray[0] === true && store.pageInitArray[1] === true && store.pageInitArray[2] === true && store.pageInitArray[3] === true) {
      // console.log('页面加载完成')
      if (store.apptype === 'ios') {
        Functions.openCustomURLinIFrame(AppConstants.IOS_FINISH + 'success')
        Functions.openCustomURLinIFrame(AppConstants.IOS_NUM + store.num)
      } else if (store.apptype === 'android') {
        window.AndroidApp.onFinish(String(true))
        window.AndroidApp.goNum(String(store.num))
      }
    } else {
      // console.log('页面加载失败')
      if (store.apptype === 'ios') {
        Functions.openCustomURLinIFrame(AppConstants.IOS_FINISH + 'failure')
      } else if (store.apptype === 'android') {
        return window.AndroidApp.onFinish(String(false))
      }
    }
  }
}

store.talkToApp = (status, componentName) => {
  if (store.apptype === 'ios') {
    if (status === 'start') {
      Functions.openCustomURLinIFrame(AppConstants.IOS_REFRESH_START + componentName + '/start')
    } else if (status === 'success') {
      Functions.openCustomURLinIFrame(AppConstants.IOS_REFRESH_FINISH + componentName + '/success')
    } else if (status === 'fail') {
      Functions.openCustomURLinIFrame(AppConstants.IOS_REFRESH_FINISH + componentName + '/failure')
    }
  }
  if (store.apptype === 'android') {
    if (status === 'start') {
      return window.AndroidApp.onRefreshStart(componentName)
    } else if (status === 'success') {
      return window.AndroidApp.onFinish(componentName, 'true')
    } else if (status === 'fail') {
      return window.AndroidApp.onFinish(componentName, 'false')
    }
  }
}
// 页面完成加载end

// try {
//   store.apptype = Functions.getUrlParameter('apptype')
//   store.eid = Functions.getUrlParameter('eid')
//   if (Functions.isEmpty(store.eid)) {
//     throw new Error('store.eid is empty!')
//   }
//   if (Functions.isEmpty(store.apptype)) {
//     throw new Error('store.apptype is empty!')
//   }
// } catch (err) {
//   if (store.apptype === 'ios') {
//     Functions.openCustomURLinIFrame(AppConstants.IOS_FINISH + 'failure')
//   } else if (store.apptype === 'android') {
//     window.AndroidApp.onFinish(String(false))
//   }
// }

// store.year = moment().format('YYYY年MM月').substring(0, 4)
// store.month = moment().format('YYYY年MM月').substring(5, 7)
// store.setTime = (year, month) => {
//   store.year = year
//   store.month = month
//   console.log('store.year:')
//   console.log(store.year)
//   console.log('store.month:')
//   console.log(store.month)
// }
