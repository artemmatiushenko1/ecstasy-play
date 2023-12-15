import { useRef, useEffect } from 'react';
import mount from 'snake/app';

const Snake = () => {
  const rootRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      const unmount = mount(rootRef.current);

      return () => {
        unmount?.();
      };
    }
  }, []);

  return <div className="flex flex-col" ref={rootRef} />;
};

export default Snake;
