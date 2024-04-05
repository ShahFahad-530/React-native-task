import React from "react";
import { View, Text } from "react-native";
import TaskList from "../screens/app/TaskList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AppNavigations = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="TaskList" component={TaskList} />
    </Stack.Navigator>
  );
};

export default AppNavigations;
