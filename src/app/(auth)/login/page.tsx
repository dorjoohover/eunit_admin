import Image from 'next/image';

import LoginForm from '@/components/auth/LoginForm';

function LoginPage() {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-white shadow-lg overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-2 h-36 bg-slate-900">
        <Image
          src="/logo/white-mini.png"
          alt="Eunit"
          width={72}
          height={72}
          className="object-contain"
        />
        <p className="text-white/60 text-xs tracking-wide">Админ хэсэг</p>
      </div>

      <div className="px-8 py-8">
        <h2 className="text-lg font-semibold text-primary mb-1">Нэвтрэх</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Админ эрхтэй имэйл хаягаараа нэвтэрнэ үү.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
