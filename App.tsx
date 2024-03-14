import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import { AppContext, AppProvider } from "./src/contexts/app.context";
import { NativeWindStyleSheet } from "nativewind";

import Toast, {
  BaseToastProps,
  ErrorToast,
  InfoToast,
  SuccessToast,
} from "react-native-toast-message";
import { eventEmitter } from "./src/utils/auth";
import HomeScreen from "./src/screens/Home";
import MovieScreen from "./src/screens/Movie";
import LoadMore from "./src/screens/Banner";
import MainTabNavigator from "./src/routes/MainTabNavigator";
import UserScreen from "./src/screens/User";
import BannerScreen from "./src/screens/Banner";
import ComboScreen from "./src/screens/Combo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

NativeWindStyleSheet.setOutput({
  default: "native",
});

function App(): JSX.Element {
  const { reset } = useContext(AppContext);
  const Stack = createNativeStackNavigator();

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <SuccessToast {...props} text1NumberOfLines={2} />
    ),
    error: (props: BaseToastProps) => (
      <ErrorToast {...props} text1NumberOfLines={2} />
    ),
    info: (props: BaseToastProps) => (
      <InfoToast {...props} text1NumberOfLines={2} />
    ),
  };

  useEffect(() => {
    eventEmitter.addListener("clearLS", reset);
    return () => {
      eventEmitter.removeAllListeners("clearLS");
    };
  }, [reset]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={"HomePage"}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name={"HomePage"} component={MainTabNavigator} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Movie" component={MovieScreen} />
            <Stack.Screen name="UserScreen" component={UserScreen} />
            <Stack.Screen name="BannerScreen" component={BannerScreen} />
            <Stack.Screen name="ComboScreen" component={ComboScreen} />
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </NavigationContainer>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
