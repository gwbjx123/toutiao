<template>
    <div class="article-list">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <van-cell v-for="(article, index) in list" :key="index" :title="article.reqJob" />
        </van-list>
    </div>
</template>
<script>
// import { getArticles } from '@/api/article'
export default {
  data () {
    return {
      props: {
        channel: {
          type: Object,
          required: true
        }
      },
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      page: 1
    }
  },
  methods: {
    async onLoad () {
      // console.log('onLoad', this.tcb)
      // 1、请求数据
      const db = this.tcb.database()
      const zpData = await db.collection('bmzhp_qiuzhi').limit(5).skip((this.page - 1) * 5).get()
      // const { articles } = await getArticles({
      //   channel_id: 1,
      //   timestamp: this.timestamp || Date.now(),
      //   with_top: 1
      // })
      console.log('获取到的数据集为', zpData)
      // 2、将请求到的数据放到list数组
      // // const { results } = articles.data
      const results = zpData.data
      this.list.push(...results)
      // // 3、设置本次加载状态结束，它才可判断是否需要加载下一次，否则就永远停在这里
      this.loading = false
      // // 4、数据全部加载完成
      if (results.length) {
        // 更新获取下一页的数据的页码
        // this.timestamp = articles.data.pre_timestamp
        this.page++
      } else {
        // 没有数据了，加载状态设置结束，不能再触发加载更多
        this.finished = true
      }
    }
  }
}
</script>
<style lang="less">
.article-list{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
}
</style>
