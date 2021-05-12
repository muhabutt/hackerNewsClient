/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const isHermes = () => !!global.HermesInternal;
console.log('hermes is enabled', isHermes());

AppRegistry.registerComponent(appName, () => App);
