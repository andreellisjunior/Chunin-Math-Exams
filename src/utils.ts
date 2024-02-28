import { createContext, useContext } from 'react';
import AppProvider from './context/AppContext';

// @ts-expect-error ignore default param
export const AppContext = createContext<AppProvider>();

export const useAppContext = () => useContext(AppContext);
