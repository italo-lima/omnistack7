import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Image } from "react-native";

import Feed from "./pages/Feed";
import New from "./pages/New";
import logo from "./assets/logo.png";

export default createAppContainer(
  //Configuração pertencente a todas as páginas
  createStackNavigator(
    {
      Feed,
      New
    },
    {
      defaultNavigationOptions: {
        headerTintColor: "#000",
        headerTitle: <Image style={{ marginHorizontal: 20 }} source={logo} />,
        headerBackTitle: null //tira o nome "voltar", mostra só a seta no IOS
      },
      mode: "modal"
    }
  )
);
