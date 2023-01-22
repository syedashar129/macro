import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function AddMacro(){


    //useState for posting
    const [macro, setMacro] = useState({
        title:"",
        description:""
    });

    //need to make the macro object before adding it (macro obj has a title description -- refer to spring obj)
    const {title, description} = macro;

    //adds the data
    const onInputChange = (e) => {
        setMacro({...macro, [e.target.name] : e.target.value})
    }

    //post data
    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/macros",macro)
        location.reload();
    }


    //useState of the 'get'
    const [Macro, setMacroTwo] = useState([]);

    //fetch the data
    const loadMacro = async (e) =>{
        const result = await axios.get("http://localhost:8080/macros")
        setMacroTwo(result.data)
        console.log(result)
    }

    //load the 'get' everytime
    useEffect(() => {
        loadMacro();
    }, [])




    return (
        <div>
            <h1>Macro Dictionary</h1>
            <form
            onSubmit={(e) => {onSubmit(e)}}>
            <input
                type={"text"}
                placeholder={"Enter Title"}
                name={"title"}
                value={title}
                onChange={(e) => onInputChange(e)}
            />

            <input
                type={"text"}
                placeholder={"Enter macro description"}
                name={"description"}
                value={description}
                onChange={(e) => onInputChange(e)}
            />
                <button
                    type={"submit"}
                >Submit</button>
            </form>
            {Macro.map((e, index) => (
                <ul>
                    <li>
                        {e.title}

                        <Popup trigger={<button>show description</button>}>
                            <div>
                                {e.description}
                            </div>
                        </Popup>
                    </li>
                </ul>
                ))}
        </div>

    )
}