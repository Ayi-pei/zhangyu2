<template>
<el-container>
  <el-header>
    <h2>未来 10 期开奖结果</h2>
  </el-header>

  <el-main>
    <el-table :data="futureResults" border style="width: 100%">
      <el-table-column prop="game_id" label="游戏ID" width="100" />
      <el-table-column prop="game_type" label="游戏类型" width="150" />
      <el-table-column prop="scheduled_time" label="开奖时间" width="180" />
      <el-table-column prop="predicted_result" label="预计开奖结果" width="150" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-input v-model="row.newResult" placeholder="修改结果" clearable />
          <el-button type="primary" @click="saveResult(row)">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getFutureResults, updateResult } from '@/api/futureResults'
import { ElMessage } from 'element-plus'

const futureResults = ref<any[]>([])

// 获取未来 10 期开奖结果
async function loadResults() {
futureResults.value = await getFutureResults()
futureResults.value.forEach(result => {
  result.newResult = result.predicted_result // 绑定修改输入框
})
}

// 保存修改的开奖结果
async function saveResult(row: any) {
const res = await updateResult(row.game_id, row.newResult)
if (res) {
  ElMessage.success(`游戏 ${row.game_id} 结果已更新`)
  loadResults() // 重新加载数据
} else {
  ElMessage.error('更新失败')
}
}

onMounted(loadResults)
</script>

<style scoped>
.el-header {
text-align: center;
font-size: 20px;
font-weight: bold;
}
</style>
