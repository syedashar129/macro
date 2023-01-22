import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import './App.css';
import AddMacro from "./AddMacro";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

export default function App() {
  return (
      <Router>
  <Routes>
    <Route
    exact path={"/"}
    element = {<AddMacro/>}
    />

  </Routes>
      </Router>

  );
}
