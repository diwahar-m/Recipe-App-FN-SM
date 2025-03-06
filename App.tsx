
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';


function App(): React.JSX.Element {
  
  return (
    <NavigationContainer>
      <RootNavigation/>
    </NavigationContainer>>
  )
}


export default App;
