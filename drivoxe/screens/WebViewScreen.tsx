// WebViewScreen.tsx
import React from 'react';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Adjust the path as needed

type WebViewScreenRouteProp = RouteProp<RootStackParamList, 'WebViewScreen'>;

type Props = {
  route: WebViewScreenRouteProp;
};

const WebViewScreen: React.FC<Props> = ({ route }) => {
  const { url } = route.params;
  console.log(url);
  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
};

export default WebViewScreen;
