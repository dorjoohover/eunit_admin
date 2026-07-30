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

    // core бүх response-оо { succeed, payload } дотор ороож буцаадаг
    // (apiService.request-ийн processResponse-той адилхан) — accessToken/
    // user нь payload дотор байна, top-level биш.
    const payload = data?.payload;

    if (!response.ok || !payload?.accessToken) {
      return { message: data?.message || 'Нэвтрэхэд алдаа гарлаа.' };
    }

    return { accessToken: payload.accessToken, user: payload.user };
  } catch {
    return { message: 'Сервертэй холбогдоход алдаа гарлаа.' };
  }
}
