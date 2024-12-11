import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Aluguel from "./pages/Aluguel";
import Home from "./pages/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Home} />
        <Stack.Screen name="Aluguel" component={Aluguel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}