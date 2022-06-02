import {
    createContext,
    ReactNode,
    useEffect,
    useState,
} from "react";
import { api } from "../services/api";

export interface Module {
    id: string;
    name: string;
    description: string;
}

interface DataContextProps {
    modules?: Module[]
}
interface DataProviderProps {
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
