import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
console.log(dayjs('2008-05-12').from(dayjs())) // 2008-5-12距现在多长时间
// console.log(dayjs.extend(relativeTime))
// 处理时间的代码包装为全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
