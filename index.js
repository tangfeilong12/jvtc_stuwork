/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import codePush from "react-native-code-push";
const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };//出弹窗提示
// let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME }//自动更新

AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(App));
