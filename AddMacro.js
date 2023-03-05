import React, {useState, useEffect} from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {Button, useTheme, Input} from "native-base";
import { NativeBaseProvider, extendTheme} from 'native-base';
import {Divider} from "@rneui/base";
import {useParams} from "react-router-dom";
import { View, Text, StyleSheet } from 'react-native';
import './Search.css';
import {Card, Paragraph, Title} from "react-native-paper";
import { SearchBar } from 'react-native-elements';


export default function AddMacro(){
    const newColorTheme = {
        brand: {
            900: '#5B8DF6',
            800: '#ffffff',
            700: '#cccccc',
        },
    };

    const theme = extendTheme({
        colors: newColorTheme,
    });
    //useState for posting
    const [macro, setMacro] = useState({
        title:"",
        description:""
    });

    // done when id used in put and delete
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

    // state for search input
    const [search, setSearch] = useState('');

    // search input box change function
    const onSearchChange = (event) => {
        setSearch(event.target.value);
    }

    // search submit state
    const [submit, setSubmit] = useState('');

    // function to save search -- not working
    const onSearchSubmit = () => {
        // if search = macro.title -- return macro.title
        Macro.map((e) => {
            if (search === e.title.toLowerCase()){
                setSubmit(e.description)
            }
        })

        return <div>
            {submit}
        </div>
    }

    const Styles = StyleSheet.create({
        container : {
            alignContent: 'center',
            margin: 37
        }})



    return (
        <NativeBaseProvider theme={theme}>

        <div>
            <div className={"App"}>

                <div className={"search-container"}>
                    <div className={"search-inner"}>
                        <div className={"search"}>
                        <Input
                            type={"text"}
                            placeholder={"Search for macro item"}
                            value={search}
                            onChange={onSearchChange}
                        />
                        </div>

                    <button
                        onClick={onSearchSubmit}>
                        Search
                    </button>
                </div>


                <div className={""}>

                    <div className={"dropdown-row"}>
                    {Macro
                        .filter((macroItem) => {
                        const searchValue = search.toLowerCase();
                        const title = macroItem.title.toLowerCase();

                        return(
                            title.startsWith(searchValue) && searchValue
                        )
                    })
                        .map((e) => (
                            <div>
                                <a href={`/description/${e.id}`}>{e.title}</a>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
            </div>

            <br/>

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
                <div>
                    <Card style={Styles.container}>
                        <Card.Content>
                            <Title>{e.title}</Title>
                        </Card.Content>

                        <Card.Content>
                            <Paragraph>{e.description}</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <Button href={`/description/${e.id}`}>View More</Button>
                        </Card.Actions>
                    </Card>
                </div>
                // <ul>
                //     <li>
                //         {e.title}
                //
                //
                //             <Button href={`/description/${e.id}`} size={"full"} colorScheme={"primary"} variant={"solid"}>show description</Button>
                //
                //
                //         <Button
                //             onPress={() => deleteItem(e.id)}
                //             size={"full"}
                //             colorScheme={"secondary"}
                //             variant={"solid"}>
                //             Delete
                //         </Button>
                //     </li>
                // </ul>

                ))}

        </div>
        </NativeBaseProvider>
    )


}

