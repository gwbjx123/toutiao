<template>
    <div>
        <!-- <van-nav-bar
          title="首页"
          left-arrow
          @click-left="$router.go(-1)"
        /> -->
      <!-- 搜索框 -->
      <form action="/">
        <van-search
          v-model="searchRTxt"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="$router.back()"
          @focus="isResultShow = false"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
      </form>
      <van-tabs v-model="active" @click="tabSwitch">
        <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
        >
          <!-- <article-list :channel="channel"/> -->
          <search-result v-if= "isResultShow" :searchRTxt= "searchRTxt" :channel= "channel"/>
          <bianmin-renli v-else :channel= "channel" />
        </van-tab>

      </van-tabs>
    </div>
</template>
<script>
// import ArticleList from './components/article-list'
import BianminRenli from './components/bianmin-renli'
import SearchResult from './components/search-results'
export default {
  name: 'HomeIndex',
  components: {
    // ArticleList,
    BianminRenli,
    SearchResult
  },
  props: {},
  data () {
    return {
      active: 0,
      searchRTxt: '',
      isResultShow: false,
      channels: [
        { id: 1, name: '求职' },
        { id: 2, name: '招聘' },
        { id: 3, name: '房产' },
        { id: 4, name: '股市' }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch () {
      // console.log('执行搜索', this.searchRTxt)
      if (this.searchRTxt === '') {
        this.$toast('请输入查询条件')
      } else {
        this.isResultShow = true
      }
    },
    tabSwitch (title, name) {
      console.log('标签切换', title)
      this.searchRTxt = ''
      this.isResultShow = !this.isResultShow
    }
  }
}
</script>
<style scoped lang="less"></style>
