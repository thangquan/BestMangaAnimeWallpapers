/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import 'react-native-gesture-handler'
import KeyboardManager from 'react-native-keyboard-manager'

LogBox.ignoreLogs([
    'Remote debugger is in a background tab which may cause apps to perform slowly',
    'Require cycle: node_modules/rn-fetch-blob/index.js',
    'Require cycle: node_modules/react-native/Libraries/Network/fetch.js'
])

if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true)
    KeyboardManager.setEnableDebugging(false)
    KeyboardManager.setKeyboardDistanceFromTextField(10)
    KeyboardManager.setEnableAutoToolbar(false)
    KeyboardManager.setToolbarPreviousNextButtonEnable(false)
    KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false)
    KeyboardManager.setShouldShowToolbarPlaceholder(false)
    KeyboardManager.setOverrideKeyboardAppearance(false)
}

AppRegistry.registerComponent(appName, () => App)
