'use client';

import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { loginAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { errorMessageMap, tr } from '@/lib/utils';

function LoginForm() {
  const [message, setMessage] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    setIsPending(false);

    if (result?.message) {
      setMessage(result.message);
    }
  };

  return (
    <form className="w-full flex flex-col gap-3" onSubmit={onSubmit}>
      {message && (
        <div className="bg-destructive/10 text-destructive text-xs rounded-md px-3 py-2">
          {message}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-xs font-medium">
          {tr('Имэйл')}
        </Label>
        <Input
          id="email"
          required
          type="email"
          name="email"
          placeholder={tr('Имэйл хаяг')}
          title={errorMessageMap['required']}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password" className="text-xs font-medium">
          {tr('Нууц үг')}
        </Label>
        <div className="relative">
          <Input
            id="password"
            required
            name="password"
            type={isVisible ? 'text' : 'password'}
            placeholder={tr('Нууц үг')}
            title={errorMessageMap['required']}
            className="pr-9"
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {isVisible ? (
              <EyeOffIcon className="w-4 h-4" />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <Button type="submit" className="mt-2 w-full" disabled={isPending}>
        {isPending ? tr('Түр хүлээнэ үү...') : tr('Нэвтрэх')}
      </Button>
    </form>
  );
}

export default LoginForm;
