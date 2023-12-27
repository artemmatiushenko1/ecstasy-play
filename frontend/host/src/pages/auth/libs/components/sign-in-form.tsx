import { AppRoute } from '@/libs/enums/app-route.enum';
import { Button, Input } from '@nextui-org/react';
import { MdLockOutline, MdOutlineMailOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SignInForm = () => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    console.log(Object.fromEntries(formData));
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
          type="submit"
          fullWidth
          color="primary"
          className="mb-2"
          variant="solid"
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
