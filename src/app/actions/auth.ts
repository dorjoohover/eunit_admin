'use server';

import { redirect } from 'next/navigation';

import { loginFetch } from '@/services';
import { deleteCookie, setCookie } from '@/app/actions/cookies';
import { formDataToObject } from '@/lib/utils';

// core-ийн Role enum: Admin = 10, Client = 20 (core/src/auth/guards/role/role.enum.ts)
const ADMIN_ROLE = 10;

export async function loginAction(formData: FormData) {
  const data = formDataToObject(formData) as { email?: string; password?: string };

  if (!data.email) {
    return { message: 'Имэйл хаягаа оруулна уу.' };
  }

  const { accessToken, user, message } = await loginFetch({
    email: data.email,
    password: data.password,
  });

  if (!accessToken || !user) {
    return { message: message || 'Нэвтрэхэд алдаа гарлаа.' };
  }

  if (user.role !== ADMIN_ROLE) {
    return { message: 'Танд админ хэсэгт хандах эрх байхгүй байна.' };
  }

  await setCookie('token', accessToken, { httpOnly: true, maxAge: 60 * 60 * 24 * 30 });

  redirect('/users');
}

export async function logoutAction() {
  await deleteCookie('token');
  redirect('/login');
}
