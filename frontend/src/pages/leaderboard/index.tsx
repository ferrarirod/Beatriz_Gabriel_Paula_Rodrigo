import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState, useCallback, useEffect } from "react";
import { api } from "../../services/api";

interface Users {
    name: string;
    score: number;
}

export function LeaderBoard(){
    
    const [users,setUsers] = useState<Users[]>();

    const handleUsers = useCallback(() => {
        api
        .get("/users")
        .then((response) => {
            setUsers(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        handleUsers();
    }, [handleUsers]);

    const columns: ColumnsType<Users> = [
        {
            title: "Nome",
            dataIndex: "name",
            key: "name",
            render: (text) => <b>{text}</b>,
        },
        {
            title: "Pontuação",
            dataIndex: "score",
            key:"score",
            defaultSortOrder: 'descend',
            onCell: (_,index) => {
                if(index == 0){
                    return {style:{backgroundColor:"gold"}}
                }
                else if(index == 1){
                    return {style:{backgroundColor:"silver"}}
                }
                else if(index == 2){
                    return {style:{backgroundColor:"brown"}}
                }
                else{
                    return{}
                }
            }
        }
    ]
    
    return (
        <>
            <h1>Tabela de Classificação</h1>
            <Table dataSource={users} columns={columns}/>
        </>
    );
}