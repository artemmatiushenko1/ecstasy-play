import { AppRoute } from '@/libs/enums/enums.js';
import { useLocation } from 'react-router-dom';
import { SignInForm } from './libs/components/sign-in-form.js';
import { SignUpForm } from './libs/components/sign-up-form.js';
import { Card, CardBody, Divider, Image } from '@nextui-org/react';
import logoImg from '@/assets/logo.png';

const AuthPage = () => {
  const { pathname } = useLocation();

  const getForm = () => {
    if (pathname === AppRoute.SIGN_IN) {
      return <SignInForm />;
    }

    return <SignUpForm />;
  };

  return (
    <div className="flex w-full max-h-screen h-screen items-center justify-center">
      <Card
        isBlurred
        className="p-4"
        classNames={{
          'base': 'max-w-[350px] w-full',
          'body': 'flex items-center gap-2',
        }}
      >
        <CardBody>
          <h1 className="text-sm text-default-400">Welcome to</h1>
          <Image src={logoImg} className="w-[150px]" />
          <Divider />
          {getForm()}
        </CardBody>
      </Card>
    </div>
  );
};

export { AuthPage };
