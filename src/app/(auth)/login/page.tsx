import Image from 'next/image';

import LoginForm from '@/components/auth/LoginForm';

function LoginPage() {
  return (
    <div className="w-96 rounded-lg border bg-background shadow-sm">
      <div className="flex items-center justify-center h-20 bg-slate-900 rounded-t-lg">
        <Image
          src="/logo/white-mini.png"
          alt="Eunit"
          width={120}
          height={40}
        />
      </div>

      <div className="px-6 pb-6">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
