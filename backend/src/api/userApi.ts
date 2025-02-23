import axios from 'axios';

interface UserInfo {
  id: string;
  username: string;
  email: string;
  balance: number;
  createdAt: Date;
}

export const getUserInfo = async (userId: string): Promise<UserInfo> => {
  try {
    const response = await axios.get<UserInfo>(`https://api.example.com/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const updateUserBalance = async (userId: string, amount: number): Promise<void> => {
  try {
    await axios.post(`https://api.example.com/users/${userId}/balance`, { amount });
  } catch (error) {
    console.error('Error updating user balance:', error);
    throw error;
  }
};