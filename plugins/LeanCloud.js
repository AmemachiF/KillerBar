import AV from 'leancloud-storage'

if (!AV.applicationId) {
  AV.init({
    appId: process.env.leanCloudAppId,
    appKey: process.env.leanCloudAppKey,
    serverURL: process.env.leanCloudServerURL
  })
}
