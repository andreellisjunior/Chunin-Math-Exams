import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { AppContext } from '../utils';

type AppProvider = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  streak: Record<string, number>;
  setStreak: Dispatch<SetStateAction<Record<string, number>>>;
};


const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('');
  const [streak, setStreak] = useState<Record<string, number>>({
    'k-1': 0,
    '1-2': 0,
    '2-3': 0,
    '3-4': 0,
    '5-6': 0,
    hard: 0,
  });

  useEffect(() => {
    localStorage.setItem(`streak`, JSON.stringify(streak));
  }, [streak]);
  return (
    <AppContext.Provider value={{ name, setName, streak, setStreak }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
