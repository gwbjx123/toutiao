<template>
    <div class="article-list">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <article-item :list='list' :id = 'channel.id'/>
  </van-list>
</div>
</template>
<script>
// import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/article-item.vue'
export default {
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    },
    searchRTxt: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      perPage: 8,
      currPage: 1
    }
  },
  watch: {
    searchRTxt (val) {
      console.log('输入的条件，实时变动', val)
    }
  },
  methods: {
    async onLoad () {
      // console.log('onLoad', this.tcb)
      console.log('channel的id是', this.channel.id)
      const db = this.tcb.database()
      var table = ''
      var searchOptions = []
      switch (this.channel.id) {
        case 1:
          table = 'bmzhp_qiuzhi'
          searchOptions = {
            reqJob: db.RegExp({
              regexp: '.*' + this.searchRTxt + '.*',
              options: 'i'
            })
          }
          break
        case 2:
          table = 'bmzhp_zhaopin'
          searchOptions = {
            reqEmp: db.RegExp({
              regexp: '.*' + this.searchRTxt + '.*',
              options: 'i'
            })
          }
          break
      }
      // 1、请求数据
      const searchData = await db.collection(table).where(searchOptions).limit(this.perPage).skip((this.currPage - 1) * this.perPage).get()
      // const { articles } = await getArticles({
      //   channel_id: this.channel.id,
      //   timestamp: this.timestamp || Date.now(),
      //   with_top: 1
      // })
      console.log('搜索到的数据集为', searchData)
      // 2、将请求到的数据放到list数组
      // const { results } = articles.data
      const results = searchData.data
      this.list.push(...results)
      // // 3、设置本次加载状态结束，它才可判断是否需要加载下一次，否则就永远停在这里
      this.loading = false
      // // 4、数据全部加载完成
      if (results.length) {
        // 更新获取下一页的数据的页码
        // this.timestamp = articles.data.pre_timestamp
        this.currPage++
      } else {
        // 没有数据了，加载状态设置结束，不能再触发加载更多
        this.finished = true
      }
    }
  }
}
</script>
<style>
body{
  font-size: 14px !important;
}
.article-list{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
}
.cardcontent{
    display: flex;
    flex-direction: column;
    padding:10px;
}
.cardtitle{
    display:flex;
    justify-content: space-between;
    text-align: left;
    border-bottom:1px solid #ccc;
    padding-bottom: 5px;
}
.cardmain{
    text-align: left;
    margin:10px 0;
}
.cardmain .avatar{
    display: flex;
    justify-content: space-between;
    margin:5px 0;
    padding-bottom:5px;
    border-bottom:1px solid #ccc;
}
.cardmain .desc{
    text-indent: 2em;
}
.cardfoot{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* font-size:14px; */
}
</style>
