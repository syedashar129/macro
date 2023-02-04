import React, {useState, useEffect} from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button } from '@rneui/themed';
import { Input } from '@rneui/themed';
import { ListItem } from '@rneui/themed';
import {Divider} from "@rneui/base";
import {useParams} from "react-router-dom";


export default function AddMacro(){


    //useState for posting
    const [macro, setMacro] = useState({
        title:"",
        description:""
    });

    const {id} = useParams()
    //need to make the macro object before adding it (macro obj has a title description -- refer to spring obj)
    const {title, description} = macro;

    //adds the data
    const onInputChange = (e) => {
        setMacro({...macro, [e.target.name] : e.target.value})
    }

    //post data
    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8081/macros",macro)
        location.reload();
    }

    //delete data
    const deleteItem = async (id) => {
        await axios.delete(`http://localhost:8081/macros/${id}`)
        await loadMacro()
    }


    //useState of the 'get'
    const [Macro, setMacroTwo] = useState([]);

    //fetch the data
    const loadMacro = async () =>{
        const result = await axios.get("http://localhost:8081/macros")
        setMacroTwo(result.data)
        console.log(result)
    }

    //load the 'get' everytime
    useEffect(() => {
        loadMacro();
    }, [])



    // for react native elements lib
    const input = React.createRef();

    return (

        <div>
            <h1>Macro Dictionary</h1>
            <form
            onSubmit={(e) => {onSubmit(e)}}>
            <input
                type={"text"}
                placeholder={"Enter Title"}
                name={"title"}
                value={macro.title}
                onChange={(e) => onInputChange(e)}
            />

            <input
                type={"text"}
                placeholder={"Enter macro description"}
                name={"description"}
                value={macro.description}
                onChange={(e) => onInputChange(e)}
            />
                <button
                    type={"submit"}
                >Submit</button>
            </form>

            <Divider width={5}/>

            {Macro.map((e, index) => (
                <ul>
                    <li>
                        {e.title}

                        <Popup trigger={<button>show description</button>}>
                            <div>
                                {e.description}
                            </div>
                        </Popup>
                        <button
                            onClick={() => deleteItem(e.id)}>
                            Delete
                        </button>
                    </li>
                </ul>
                ))}
        </div>

    )
}