<template>
  <div>
    <h2>后台管理概览</h2>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <h3>用户总数</h3>
          <p>{{ stats.totalUsers }}</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h3>总投注金额</h3>
          <p>{{ stats.totalBets }} 元</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h3>最新开奖结果</h3>
          <p>{{ stats.latestResult }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const stats = ref({
  totalUsers: 0,
  totalBets: 0,
  latestResult: '',
});

// 获取统计数据
const fetchStats = async () => {
  const { data } = await axios.get('/api/stats');
  stats.value = data;
};

onMounted(fetchStats);
</script>

<style scoped>
h3 {
  margin-bottom: 8px;
}
p {
  font-size: 20px;
  font-weight: bold;
}
</style>
