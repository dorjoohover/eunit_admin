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
  try {
    const response = await fetch(`${API_URL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok || !data?.accessToken) {
      return { message: data?.message || 'Нэвтрэхэд алдаа гарлаа.' };
    }

    return { accessToken: data.accessToken, user: data.user };
  } catch {
    return { message: 'Сервертэй холбогдоход алдаа гарлаа.' };
  }
}
