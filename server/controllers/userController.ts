// src/controllers/userController.ts
import { Request, Response } from 'express';
import { supabase } from '../src/api/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  // 检查用户名是否存在
  const { data, error } = await supabase
    .from('users')
    .select('username, email')
    .eq('username', username)
    .single();

  if (data) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const { error: insertError } = await supabase
    .from('users')
    .insert([{ username, password: hashedPassword, email }]);

  if (insertError) {
    return res.status(500).json({ error: 'Error registering user' });
  }

  res.status(201).json({ message: 'User registered successfully' });
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('id, username, email, password')
    .eq('username', username)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, data.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { username: data.username },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );

  res.json({ token, user: { username: data.username, email: data.email } });
};

export const getUserProfile = async (req: Request, res: Response) => {
  const username = req.user.username;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { password, ...userProfile } = data;
  res.json(userProfile);
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const username = req.user.username;
  const updatedInfo = req.body;

  const { data, error } = await supabase
    .from('users')
    .update(updatedInfo)
    .eq('username', username);

  if (error || !data) {
    return res.status(500).json({ error: 'Failed to update user profile' });
  }

  res.json({ message: 'User profile updated successfully' });
};
