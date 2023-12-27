import { AppRoute } from '@/libs/enums/app-route.enum';
import { authApi } from '@/packages/auth/auth.package.js';
import { SignInRequest } from '@/packages/auth/libs/types/types.js';
import { useAuthStore } from '@/stores/auth/auth.js';
import { Button, Input } from '@nextui-org/react';
import { MdLockOutline, MdOutlineMailOutline } from 'react-icons/md';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

const SignInForm = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const signInMutation = useMutation(authApi.signIn, {
    onSuccess: ({ accessToken }) => setAccessToken(accessToken),
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const signInRequest = Object.fromEntries(
      new FormData(e.target as HTMLFormElement),
    ) as SignInRequest;

    signInMutation.mutate(signInRequest);
  };

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-2 w-full mb-4"
        onSubmit={handleFormSubmit}
      >
        <Input
          isRequired
          fullWidth
          name="email"
          type="email"
          startContent={
            <MdOutlineMailOutline className="text-default-400 text-xl" />
          }
          placeholder="Email"
        />
        <Input
          isRequired
          fullWidth
          name="password"
          type="password"
          startContent={<MdLockOutline className="text-default-400 text-xl" />}
          placeholder="Password"
        />
        <Button
          fullWidth
          type="submit"
          color="primary"
          className="mb-2"
          variant="solid"
          isLoading={signInMutation.isLoading}
        >
          Sign In
        </Button>
      </form>
      <p className="text-sm text-default-400 text-center">
        <span>Dont have an account?</span>{' '}
        <Link className="text-primary" to={AppRoute.SIGN_UP}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export { SignInForm };
