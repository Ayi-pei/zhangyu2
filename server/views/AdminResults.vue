<template>
  <div>
    <h2>开奖结果管理</h2>
    <el-table :data="results" style="width: 100%">
      <el-table-column prop="winning_numbers" label="中奖号码" />
      <el-table-column prop="draw_date" label="开奖日期" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="editResult(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑开奖结果的弹窗 -->
    <el-dialog v-model="dialogVisible" title="编辑开奖结果">
      <el-form :model="currentResult">
        <el-form-item label="中奖号码">
          <el-input v-model="currentResult.winning_numbers"></el-input>
        </el-form-item>
        <el-form-item label="开奖日期">
          <el-date-picker v-model="currentResult.draw_date" type="date"></el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateResult">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const results = ref([]);
const dialogVisible = ref(false);
const currentResult = ref({});

// 获取开奖结果
const fetchResults = async () => {
  const { data } = await axios.get('/api/results');
  results.value = data;
};

// 编辑开奖结果
const editResult = (result) => {
  currentResult.value = { ...result };
  dialogVisible.value = true;
};

// 更新开奖结果
const updateResult = async () => {
  await axios.put(`/api/results/${currentResult.value.id}`, currentResult.value);
  dialogVisible.value = false;
  fetchResults();
};

onMounted(fetchResults);
</script>
