import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const API_KEY = '57ed164d';

function MovieSearch({ navigation }) {
  const [moviesData, setMoviesData] = useState({});
  const [movieSearched, setMovieSearched] = useState('');

  // extract the data from api
  const extractDataOnSearch = async (query) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      setMoviesData(response?.data?.Search);
    } catch (error) {
      console.log(error, 'Error Fetching the APi');
    }
  };

  // get calls whenever user changes the text
  useEffect(() => {
    if (movieSearched?.length > 0) {
      extractDataOnSearch(movieSearched);
    }
  }, [movieSearched]);

  // this stores movie in async storage and naviagte movie to details screen
  const saveMovieSearch = async (movieItem) => {
    const searchedMovie = {
      title: movieItem?.Title,
      dateTime: new Date().toTimeString(),
    };

    try {
      const searchedMovies = await AsyncStorage.getItem('movies');
      let movies = [];

      if (searchedMovies) {
        movies = JSON.parse(searchedMovies);
      }

      if (movies) {
        const handleDuplicateSearch = movies.some(
          (movie) => movie?.title === searchedMovie.title
        );
        !handleDuplicateSearch && movies.push(searchedMovie);
      }
      await AsyncStorage.setItem('movies', JSON.stringify(movies));
      navigation.navigate('MovieDetails', { movieItem });
    } catch (error) {
      console.log('Error saving movie details:', error);
    }
  };

  // renders the search bar list item
  const renderMovieItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          saveMovieSearch(item);
        }}
        style={styles.searchItemContainer}
      >
        <Text style={styles.movieTitle}>
          {item.Title} {item.Year}
        </Text>
      </TouchableOpacity>
    );
  };

  // handle navigation to history screen
  const navigateToSearchedMovies = () => {
    navigation.navigate('SearchedMovies');
  };

  return (
    <View style={styles.container}>
      <View style={styles.barAndButtonStyle}>
        <TextInput
          style={styles.movieSearchBar}
          placeholder="Search a movie"
          value={movieSearched}
          onChangeText={setMovieSearched}
        />
        <TouchableOpacity
          style={styles.historyButton}
          onPress={navigateToSearchedMovies}
        >
          <Text style={styles.historyButtonText}>Searched History</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={moviesData}
        keyExtractor={(item) => item.imdbID}
        renderItem={renderMovieItem}
        style={styles.movieListStyle}
      />
    </View>
  );
}

export default MovieSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  movieSearchBar: {
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    padding: 12,
    flex: 1,
  },
  movieDetailStyle: {
    padding: 8,
    borderWidth: 1,
    opacity: 0.6,
    borderColor: 'grey',
  },
  movieListStyle: {
    marginTop: 8,
  },
  searchedButtonStyle: {
    marginLeft: 16,
  },
  searchItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 2,
  },
  movieTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  historyButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#ef5350',
    borderRadius: 8,
    elevation: 2,
    marginLeft: 4,
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  barAndButtonStyle: { flexDirection: 'row', alignItems: 'center' },
});
