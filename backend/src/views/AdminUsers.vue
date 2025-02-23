<template>
  <div>
    <h2>用户管理</h2>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="id" label="用户ID" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="balance" label="余额" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="vipLevel" label="会员等级" />
      <el-table-column prop="bankAccount" label="银行卡号" />
      <el-table-column prop="bankName" label="开户行" />
      <el-table-column prop="cardHolder" label="持卡人" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="editUser(row)">编辑</el-button>
          <el-button type="danger" @click="banUser(row)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑用户弹窗 -->
    <el-dialog v-model="dialogVisible" title="编辑用户">
      <el-form :model="currentUser">
        <el-form-item label="用户名">
          <el-input v-model="currentUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="currentUser.password" type="password" placeholder="留空则不修改"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="currentUser.email"></el-input>
        </el-form-item>
        <el-form-item label="余额">
          <el-input v-model="currentUser.balance" type="number"></el-input>
        </el-form-item>
        <el-form-item label="兑换码（提现密码）">
          <el-input v-model="currentUser.withdrawalCode" placeholder="留空则不修改"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="currentUser.status">
            <el-option label="正常" value="active"></el-option>
            <el-option label="禁用" value="banned"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-select v-model="currentUser.vipLevel">
            <el-option label="普通" value="normal"></el-option>
            <el-option label="黄金" value="gold"></el-option>
            <el-option label="钻石" value="diamond"></el-option>
          </el-select>
        </el-form-item>
        <el-divider>银行卡信息</el-divider>
        <el-form-item label="银行卡号">
          <el-input v-model="currentUser.bankAccount" placeholder="请输入银行卡号"></el-input>
        </el-form-item>
        <el-form-item label="开户行">
          <el-input v-model="currentUser.bankName" placeholder="请输入开户行名称"></el-input>
        </el-form-item>
        <el-form-item label="持卡人">
          <el-input v-model="currentUser.cardHolder" placeholder="请输入持卡人姓名"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateUser">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);
const dialogVisible = ref(false);
const currentUser = ref({});

// 获取用户列表
const fetchUsers = async () => {
  const { data } = await axios.get('/api/users');
  users.value = data;
};

// 编辑用户
const editUser = (user) => {
  currentUser.value = { ...user, password: '', withdrawalCode: '' }; // 避免覆盖密码
  dialogVisible.value = true;
};

// 更新用户信息
const updateUser = async () => {
  await axios.put(`/api/users/${currentUser.value.id}`, currentUser.value);
  dialogVisible.value = false;
  fetchUsers();
};

// 禁用用户
const banUser = async (user) => {
  await axios.put(`/api/users/${user.id}`, { status: 'banned' });
  fetchUsers();
};

onMounted(fetchUsers);
</script>
