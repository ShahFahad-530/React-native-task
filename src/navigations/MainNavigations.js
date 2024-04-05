import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import AuthNavigations from "./AuthNavigations";
import { useSelector } from "react-redux";
import AppNavigations from "./AppNavigations";

const MainNavigations = () => {
  const isSigned = useSelector((state) => state.task.isSigned);
  return (
    <NavigationContainer>
      {!isSigned ? <AuthNavigations /> : <AppNavigations />}
    </NavigationContainer>
  );
};

export default MainNavigations;
