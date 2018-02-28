import AppConstants from './constants/AppConstants'
import Functions from './common'
const talk = {}
export default talk
talk.apptype = Functions.getUrlParameter('apptype')
talk.detailState = false
talk.listState = false
talk.start = start => {
  if (start === true) {
    // console.log('页面开始加载')
    if (talk.apptype === 'ios') {
      Functions.openCustomURLinIFrame(AppConstants.IOS_START)
    } else if (talk.apptype === 'android') {
      return window.AndroidApp.onStart()
    }
  }
}
talk.complete = (detailState, listState) => {
  if (detailState === true && listState === true) {
    // console.log('页面加载完成')
    if (talk.apptype === 'ios') {
      Functions.openCustomURLinIFrame(AppConstants.IOS_FINISH + 'success')
    } else if (talk.apptype === 'android') {
      window.AndroidApp.onFinish(String(true))
    }
  }
}
talk.finish = () => {
  // console.log('页面加载结束')
  if (talk.apptype === 'ios') {
    Functions.openCustomURLinIFrame(AppConstants.IOS_FINISH + 'failure')
  } else if (talk.apptype === 'android') {
    return window.AndroidApp.onFinish(String(false))
  }
}
talk.list = (id) => {
  if (talk.apptype === 'ios') {
    Functions.openCustomURLinIFrame(AppConstants.IOS_LIST + 'http://m.itianluo.cn:9001/score/?id=' + id)
  } else if (talk.apptype === 'android') {
    return window.AndroidApp.goList('http://m.itianluo.cn:9001/score/?id=' + id)
  }
}
talk.img = (url) => {
  if (talk.apptype === 'ios') {
    Functions.openCustomURLinIFrame(AppConstants.IOS_IMG + url)
  }
}
talk.id = (id, rtype, ttype, score) => {
  if (talk.apptype === 'ios') {
    if (rtype === 1 && ttype === 0) {
      Functions.openCustomURLinIFrame(AppConstants.IOS_TASK_ID + id)
    } else if (rtype === 1 && ttype === 1) {
      Functions.openCustomURLinIFrame(AppConstants.IOS_SUPERVISE_ID + id)
    } else if (rtype === 2 && score > 0) {
      Functions.openCustomURLinIFrame(AppConstants.IOS_PRAISE_ID + id)
    } else if (rtype === 2 && score < 0) {
      Functions.openCustomURLinIFrame(AppConstants.IOS_COMPLAINT_ID + id)
    } else if (rtype === 4 && ttype === 0) {
      Functions.openCustomURLinIFrame(AppConstants.IOS_TASK_ID + id)
    } else if (rtype === 4 && ttype === 1) {
      Functions.openCustomURLinIFrame(AppConstants.IOS_SUPERVISE_ID + id)
    } else if (rtype === 5) {
      Functions.openCustomURLinIFrame(AppConstants.IOS_MY_SUPERVISE_ID + id)
    }
  }
}
// talk.activityThemeState = false
// talk.activityFollowersState = false
// talk.activityDetailsState = false
// talk.activityCommentsState = false
// talk.activityIsFinish = () => {
//   if (talk.activityThemeState && talk.activityFollowersState && talk.activityDetailsState && talk.activityCommentsState) {
//     if (talk.apptype === 'ios') {
//       Functions.openCustomURLinIFrame(AppConstants.IOS_FINISH + 'success')
//     } else if (talk.apptype === 'android') {
//       return window.AndroidApp.onFinish(true)
//     }
//   }else {
//     if (talk.apptype === 'ios') {
//       Functions.openCustomURLinIFrame(AppConstants.IOS_FINISH + 'failure')
//     } else if (talk.apptype === 'android') {
//       return window.AndroidApp.onFinish(false)
//     }
//   }
// }
