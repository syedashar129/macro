import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function MacroDescription(){
    const [macro, setMacro] = useState({
        title:"",
        description:""
    })

    const {id} = useParams();

    const loadMacros = async () => {
        const result = await axios.get(`http://localhost:8081/macros/${id}`);
        setMacro(result.data)
    }

    useEffect(() => {
        loadMacros()
    }, [])

    return (

        <div>
            <button></button>
            <h1>{macro.title}</h1>
            <h2>Description : {macro.description}</h2>
        </div>
    )
}