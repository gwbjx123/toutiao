import cloudbase from '@cloudbase/js-sdk'

const tcb = cloudbase.init({
  env: 'development-8feb68'
})
// tcb.auth({
//   persistence: 'session'
// })
//   .anonymousAuthProvider()
//   .signIn()
//   .then(res => {
//     console.log(res) // 登录成功
//   })
//   .catch(err => {
//     console.log(err) // 登录失败
//   })

export default tcb
