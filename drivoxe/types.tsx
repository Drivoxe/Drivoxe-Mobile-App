/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Room } from "./config/types";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Stepper: undefined;
  Forget: undefined;
  Profile: undefined;
  Home: undefined;
  Homestack: undefined;

  Details: { room: Room };
  deals: undefined;
  App: undefined;
  New: undefined;
  bid: { room: Room };
  WebViewScreen: { url: string };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
