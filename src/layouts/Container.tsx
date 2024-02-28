import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className='container max-w-96 mx-auto px-4 h-screen'>{children}</div>;
};

export default Container;
