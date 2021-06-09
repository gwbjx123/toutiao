<template>
    <div class="content">
        <div class="article-item" v-if="id==1">
            <div class="card" v-for="(item,index) in list" :key="index+'-card'">
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
                        <div class="time"><span>发布日期：</span>{{item.time | relativeTime}}</div>
                        <div class="tel">
                            <span>联系方式：</span>
                            <span v-if="item.telphone">{{item.telphone| toTel}}</span>
                            <span v-else>未知</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="article-item" v-if="id==2">
            <div class="card" v-for="(item,index) in list" :key="index+'-card'">
                <div class="cardcontent">
                    <div class="cardtitle">
                        <div class="title">
                            <span class="bold">{{item.reqEmp}}</span>
                            <van-tag color="red" style="margin-left:5px;" v-if="item.isCerti==0">{{item.isCerti==0?"未认证":"已认证"}}</van-tag>
                            <van-tag color="#FF9B6A" style="margin-left:5px;" v-if="item.isCerti==1">已认证</van-tag>
                        </div>
                        <van-tag type="primary">招</van-tag>
                    </div>
                    <div class="cardmain">
                        <div class="company">
                        </div>
                        <van-collapse v-model="activeName" accordion>
                            <van-collapse-item title="职位描述" :name="index+'岗位描述'">{{item.staDesc}}</van-collapse-item>
                            <van-collapse-item title="职位要求" :name="index+'职位要求'">
                                <div class="exprience" v-if="item.staReq">
                                    <ol>
                                        <li style="color:#666;font-style:italic;text-indent:2em" v-for="(stareq,idx) in item.staReq" :key="idx+'-stareq'">
                                            {{(idx+1) +'、'+stareq}}
                                        </li>
                                    </ol>
                                </div>
                                <div class="exprience" v-else>
                                    无
                                </div>
                            </van-collapse-item>
                            <van-collapse-item title="薪资标准" :name="index+'薪资标准'">{{item.staMoney}}</van-collapse-item>
                        </van-collapse>
                        <div class="compaddr"><span class="bold">联系地址:</span>{{item.compAddr}}</div>
                    </div>
                    <div class="cardfoot">
                        <div class="time"><span>发布日期：</span>{{$moment(item.time).format('YYYY-MM-DD')}}</div>
                        <div class="tel">
                            <span>联系方式：</span>
                            <span v-if="item.telphone">{{item.telphone| toTel}}</span>
                            <span v-else>未知</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
  name: 'ArticleItem',
  components: {},
  filters: {

    toTel (tel) {
      var reg = /^(\d{3})\d{4}(\d{4})$/
      return tel.replace(reg, '$1****$2')
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    id: Number
  },
  data () {
    return {
      activeName: '1'
    }
  }
}
</script>
<style>

</style>
