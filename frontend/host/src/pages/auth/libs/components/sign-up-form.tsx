import { AppRoute } from '@/libs/enums/app-route.enum';
import { authApi } from '@/packages/auth/auth.package';
import { SignUpRequest } from '@/packages/auth/libs/types/sign-up-request.type';
import { useAuthStore } from '@/stores/auth/auth';
import { Button, Input } from '@nextui-org/react';
import {
  MdLockOutline,
  MdOutlineMailOutline,
  MdOutlinePersonOutline,
} from 'react-icons/md';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const signUpMutation = useMutation(authApi.signUp, {
    onSuccess: ({ accessToken }) => setAccessToken(accessToken),
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const signUpRequest = Object.fromEntries(
      new FormData(e.target as HTMLFormElement),
    ) as SignUpRequest;

    signUpMutation.mutate(signUpRequest);
  };

  return (
    <div className="w-full">
      <form
        className="flex flex-col gap-2 w-full mb-4"
        onSubmit={handleFormSubmit}
      >
        <Input
          name="name"
          isRequired
          fullWidth
          startContent={
            <MdOutlinePersonOutline className="text-default-400 text-xl" />
          }
          placeholder="Full name"
        />
        <Input
          name="email"
          isRequired
          fullWidth
          type="email"
          startContent={
            <MdOutlineMailOutline className="text-default-400 text-xl" />
          }
          placeholder="Email"
        />
        <Input
          name="password"
          isRequired
          fullWidth
          type="password"
          startContent={<MdLockOutline className="text-default-400 text-xl" />}
          placeholder="Password"
        />
        <Button
          type="submit"
          fullWidth
          color="primary"
          className="mb-2"
          variant="solid"
          isLoading={signUpMutation.isLoading}
        >
          Sign Up
        </Button>
      </form>
      <p className="text-sm text-default-400 text-center">
        <span>Already have an account?</span>{' '}
        <Link className="text-primary" to={AppRoute.SIGN_IN}>
          Sign In
        </Link>
      </p>
    </div>
  );
};

export { SignUpForm };
