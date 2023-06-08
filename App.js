import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieSearch from './js/MovieSearch/MovieSearchScreen';
import MovieDetails from './js/MovieSearch/MovieDetails';
import SearchedMovies from './js/MovieSearch/SearchedMovies';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MovieSearch" component={MovieSearch} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
        <Stack.Screen name="SearchedMovies" component={SearchedMovies} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
