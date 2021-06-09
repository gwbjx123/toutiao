<template>
    <div class="article-list">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <article-item :list='list' :id = 'channel.id'/>
            <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.reqJob" /> -->
            <!-- <div ref ="obtain" class="card" v-for="(item,index) in list" :key="index+'-card'">
                               <div class="cardcontent">
                                            <div class="cardtitle">
                                               <span class="bold">{{item.reqJob}}</span>
                                            </div>
                                            <div class="cardmain">
                                                <div class="avatar">
                                                    <div class="sex"> <span class="bold"> 性别:</span>{{item.sex}}</div>
                                                    <div class="age"><span class="bold">年龄:</span>{{item.age}}</div>
                                                    <div class="stu"><span class="bold">学历:</span>{{item.stu}}</div>
                                                </div>
                                                <div class="desc">{{item.reqDesc}}</div>
                                                <div class="exprience" v-if="item.exprience">
                                                    <p> <span class="bold"> 工作经历：</span> </p>
                                                    <ol>
                                                        <li style="color:#666;font-style:italic;text-indent:2em" v-for="(exp,idx) in item.exprience" :key="idx+'-exp'">
                                                                {{(idx+1) +'、'+exp}}
                                                        </li>
                                                    </ol>
                                                </div>
                                                <div class="exprience" v-else>
                                                    <p> <span class="bold"> 工作经历：</span> </p>
                                                       无
                                                </div>
                                            </div>

                                            <div class="cardfoot">
                                                <!- <div class="time"><span>发布日期：</span>{{$moment(item.time).format('YYYY-MM-DD')}}</div> -->
                                                <!-- <div class="tel">
                                                    <span>联系方式：</span>
                                                    <span v-if="item.telphone">{{item.telphone| toTel}}</span>
                                                    <span v-else>未知</span>
                                                </div>
                                          </div>
                            </div>
                    </div>  -->
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
  methods: {
    async onLoad () {
      // console.log('onLoad', this.tcb)
      console.log('channel的id是', this.channel.id)
      var table = ''
      switch (this.channel.id) {
        case 1:
          table = 'bmzhp_qiuzhi'
          break
        case 2:
          table = 'bmzhp_zhaopin'
          break
      }
      // 1、请求数据
      const db = this.tcb.database()
      const zpData = await db.collection(table).limit(this.perPage).skip((this.currPage - 1) * this.perPage).get()
      // const { articles } = await getArticles({
      //   channel_id: this.channel.id,
      //   timestamp: this.timestamp || Date.now(),
      //   with_top: 1
      // })
      console.log('获取到的数据集为', zpData)
      // 2、将请求到的数据放到list数组
      // const { results } = articles.data
      const results = zpData.data
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
