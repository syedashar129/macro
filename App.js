import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import './App.css';
import AddMacro from "./AddMacro";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MacroDescription from "./MacroDescription";
import React from 'react';
import { Header, Icon} from 'react-native-elements';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {createContext, useState} from 'react';
import ReactSwitch from "react-switch";
import {Card} from "react-native-elements";



// this is to get themes from hook
export const ThemeContext = createContext(null);

export default function App() {
   const [theme, setTheme] = useState("light");

   const toggle = () => {
       setTheme((curr) => (
           curr === "light" ? "dark" : "light"
       ))
   }


  return (

      <NavigationContainer>
      <div id={theme}>
          <div className={"macroHeader"}>
              <SafeAreaProvider>
                  <SafeAreaView style={styles.container}>
                      <Header
                          backgroundImageStyle={{}}
                          barStyle="default"
                          centerComponent={{
                              text: "MACRO",
                              style: { color: "#fff" }
                          }}
                          centerContainerStyle={{}}
                          containerStyle={{ width: 350 }}
                          leftComponent={{ icon: "menu", color: "#fff" }}
                          leftContainerStyle={{}}
                          linearGradientProps={{}}
                          placement="center"
                          rightComponent={
                              <TouchableOpacity>
                                  <Icon href={"/"} name="home" type="font-awesome" color="#fff" />
                              </TouchableOpacity>

                      }
                          rightContainerStyle={{}}
                          statusBarProps={{}}
                      />
                      {/* Other components go here */}
                  </SafeAreaView>
              </SafeAreaProvider>
          </div>
          <ReactSwitch checked={theme==="dark"} onChange={toggle}/>

          <Router>
                <Routes>
                  <Route
                    exact path={"/"}
                    element={<AddMacro/>}
                  />
                <Route
                    exact path="/description/:id"
                    element={<MacroDescription/>}
                />
                </Routes>
          </Router>


      </div>
      </NavigationContainer>

  );
}

// for styling views
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#fff', // Set your desired background color
        borderBottomWidth: 0, // Remove the default bottom border
    },
    headerText: {
        fontSize: 20, // Set your desired font size
        fontWeight: 'bold', // Set your desired font weight
    },
});
