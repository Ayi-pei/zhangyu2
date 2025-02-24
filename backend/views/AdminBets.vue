<template>
    <div>
      <h2>投注记录管理</h2>
      <el-table :data="bets" style="width: 100%">
        <el-table-column prop="user_id" label="用户ID" />
        <el-table-column prop="amount" label="投注金额" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="editBet(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 编辑投注记录的弹窗 -->
      <el-dialog v-model="dialogVisible" title="编辑投注">
        <el-form :model="currentBet">
          <el-form-item label="投注金额">
            <el-input v-model="currentBet.amount" type="number"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="currentBet.status">
              <el-option label="待处理" value="pending"></el-option>
              <el-option label="已结算" value="settled"></el-option>
              <el-option label="取消" value="canceled"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateBet">保存</el-button>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const bets = ref([]);
  const dialogVisible = ref(false);
  const currentBet = ref({});
  
  // 获取投注数据
  const fetchBets = async () => {
    const { data } = await axios.get('/api/bets');
    bets.value = data;
  };
  
  // 编辑投注记录
  const editBet = (bet) => {
    currentBet.value = { ...bet };
    dialogVisible.value = true;
  };
  
  // 更新投注记录
  const updateBet = async () => {
    await axios.put(`/api/bets/${currentBet.value.id}`, currentBet.value);
    dialogVisible.value = false;
    fetchBets();
  };
  
  onMounted(fetchBets);
  </script>
  