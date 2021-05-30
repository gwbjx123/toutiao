<template>
    <div>
        <van-nav-bar
          title="首页"
          left-arrow
          @click-left="$router.go(-1)"
        />
      <van-tabs v-model="active">
        <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
        >
          <!-- <article-list :channel="channel"/> -->
          <bianmin-renli :channel="channel"/>
        </van-tab>

      </van-tabs>
    </div>
</template>
<script>
// import ArticleList from './components/article-list'
import BianminRenli from './components/bianmin-renli'
export default {
  name: 'HomeIndex',
  components: {
    // ArticleList,
    BianminRenli
  },
  props: {},
  data () {
    return {
      active: 0,
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
  methods: {}
}
</script>
<style scoped lang="less"></style>
