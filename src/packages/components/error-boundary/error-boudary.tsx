import { Component, ReactNode } from 'react';
import { MdError } from 'react-icons/md';

interface IErrorBoundaryProps {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <h1>
          <span className="text-danger-500 font-bold text-4xl inline-flex items-center">
            <MdError className="mr-2" />
            Oops...
          </span>
          <br />
          <span className="text-default-400">Something went wrong.</span>
        </h1>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
