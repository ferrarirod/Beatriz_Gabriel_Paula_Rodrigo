import {
    createContext,
    ReactNode,
    useEffect,
    useState,
  } from "react";
import { api } from "../services/api";

export interface Class {
    id:string;
    title:string;
    module:string;
    content:string,
    link:string
}

interface DataContextProps{
    classes?: Class[]
}
interface DataProviderProps{
    children: ReactNode;

}

export const DataContext = createContext<DataContextProps>({} as DataContextProps);

export default function DataProvider({ children }: DataProviderProps) {

    
    return (
        <DataContext.Provider
            value={{
            }}>
            {children}
        </DataContext.Provider>
        );

}





