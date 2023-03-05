import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import './MacroDescription.css'
import { View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { LineChart } from 'react-native-chart-kit';

const data = {
    labels: ['Positive', 'Negative'],
    datasets: [
    {
        data: [20, 40],
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // green
    },
    {
        data: [20, 40],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // red
    },
    ],
};

const LineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            data: [50, 30, 20, 40, 70, 50, 30],
            strokeWidth: 2, // optional
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // blue
            fillGradient: {
                colors: ['#0c3a6d', '#72acd4'],
                start: { x: 0, y: 0 },
                end: { x: 0, y: 1 },
            },
            fillShadowGradientOpacity: 1,
            fillShadowGradient: '#0c3a6d',
        },
    ],
};

const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
};
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
        console.log(macro)
    }, [])

    return (

        <div>
            <h1>{macro.title.toUpperCase()}</h1>
            <p>{macro.description}</p>

        <br/>
            <View>
                <LineChart
                    data={LineData}
                    width={320}
                    height={200}
                    chartConfig={chartConfig}
                />
            </View>
            <View>
                <BarChart
                    data={data}
                    width={320}
                    height={200}
                    chartConfig={chartConfig}
                />
            </View>
        </div>
    )
}