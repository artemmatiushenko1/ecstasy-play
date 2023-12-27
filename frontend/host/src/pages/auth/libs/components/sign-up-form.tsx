import { AppRoute } from '@/libs/enums/app-route.enum';
import { Button, Input } from '@nextui-org/react';
import {
  MdLockOutline,
  MdOutlineMailOutline,
  MdOutlinePersonOutline,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
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
          name="fullName"
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
