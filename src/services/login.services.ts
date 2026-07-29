import { API_URL } from '@/lib/configs';
import { UserType } from '@/types';

type LoginPayload = {
  email: string;
  password?: string;
};

type LoginResult = {
  accessToken?: string;
  user?: UserType;
  message?: string;
};

// core-ийн жинхэнэ endpoint: @Public() @Post('login') (prefix-гүй, /users/signIn биш)
export async function loginFetch(body: LoginPayload): Promise<LoginResult> {
  const url = `${API_URL}login`;
  console.log('[loginFetch] calling', url);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('[loginFetch] status', response.status, 'body', data);

    if (!response.ok || !data?.accessToken) {
      return { message: data?.message || 'Нэвтрэхэд алдаа гарлаа.' };
    }

    return { accessToken: data.accessToken, user: data.user };
  } catch (err) {
    console.log('[loginFetch] threw', err);
    return { message: 'Сервертэй холбогдоход алдаа гарлаа.' };
  }
}
