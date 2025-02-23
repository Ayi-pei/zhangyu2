<template>
  <el-container>
    <el-header>
      <h2>后台管理</h2>
    </el-header>

    <el-main>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card>
            <h3>查询玩家</h3>
            <el-input v-model="searchId" placeholder="输入玩家ID查询" clearable />
            <el-button @click="searchUser">查询</el-button>
          </el-card>

          <el-card v-if="user">
            <p>玩家ID: {{ user.id }}</p>
            <p>用户名: {{ user.username }}</p>
            <p>账户余额: ¥{{ user.balance }}</p>
          </el-card>
        </el-col>

        <el-col :span="16">
          <el-card>
            <h3>投注记录</h3>
            <el-table :data="bets">
              <el-table-column prop="game_type" label="游戏类型" />
              <el-table-column prop="amount" label="投注金额" />
              <el-table-column prop="status" label="状态" />
              <el-table-column prop="created_at" label="时间" />
            </el-table>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-card>
            <h3>投注数据统计</h3>
            <div ref="chartRef" style="height: 400px;"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { getUserInfo, getUserBets, getBetStats } from '@/api/supabase'

const searchId = ref('')
const user = ref(null)
const bets = ref([])
const chartRef = ref<HTMLElement | null>(null)

// 查询玩家信息
async function searchUser() {
  if (!searchId.value) return;
  user.value = await getUserInfo(searchId.value);
  bets.value = await getUserBets(searchId.value);
}

// 初始化 ECharts
async function loadChart() {
  await nextTick(); // 确保 DOM 已经渲染
  const chart = echarts.init(chartRef.value as HTMLElement);
  
  const stats = await getBetStats();
  const option = {
    title: { text: '各游戏投注总额' },
    tooltip: { trigger: 'item' },
    series: [{
      name: '投注总额',
      type: 'pie',
      radius: '50%',
      data: stats.map(item => ({ name: item.game_type, value: item.total_bet }))
    }]
  };
  chart.setOption(option);
}

onMounted(loadChart);
</script>

<style scoped>
.el-header {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
</style>
