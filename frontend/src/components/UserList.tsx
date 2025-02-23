import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/userApi';

// 定义 User 类型
interface User {
  id: number;
  name: string;
}

const UserList: React.FC = () => {
  // 为 users 数组指定类型
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;