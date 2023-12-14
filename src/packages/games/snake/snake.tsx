import { useRef, useEffect } from 'react';
import mount from 'snake/app';

const Snake = () => {
  const rootRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      mount(rootRef.current);
    }

    return () => {
      // TODO: should unmount somehow and restore strict more
    };
  }, []);

  return <div className="flex flex-col" ref={rootRef} />;
};

export default Snake;
