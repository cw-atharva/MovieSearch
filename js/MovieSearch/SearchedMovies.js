import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';

function SearchedMovies() {
  const [searchedMovie, setSearchedMovie] = useState(null);

  useEffect(() => {
    const getSearchedMovies = async () => {
      try {
        const movieDetails = await AsyncStorage.getItem('movies');

        if (movieDetails) {
          setSearchedMovie(JSON.parse(movieDetails));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSearchedMovies();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Searched Movies</Text>
      {searchedMovie?.length > 0 ? (
        searchedMovie?.map((movie, index) => (
          <View key={index} style={styles.movieContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.dateTime}>{movie.dateTime}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>No searched movies found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  movieContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  dateTime: {
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default SearchedMovies;
