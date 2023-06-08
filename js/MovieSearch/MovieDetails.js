import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';

function MovieDetails({ route }) {
  const { movieItem } = route.params || {};
  const { Poster, Title, Year } = movieItem || {};
  return (
    <ScrollView style={styles.container}>
      <View style={styles.moviesDetailsStyle}>
        <Image
          source={{ uri: Poster }}
          style={styles.movieImageStyle}
          resizeMode="cover"
        />
        {(Title?.length > 0 || Year?.length > 0) && (
          <View style={styles.movieNameAndYearStyle}>
            {Title?.length > 0 && (
              <Text style={styles.titleStyle}>{Title}</Text>
            )}
            {Year?.length > 0 && (
              <Text style={styles.yearStyle}>Release Year : {Year}</Text>
            )}
          </View>
        )}
        {/* not implemented plot as it does not comes from api */}
      </View>
    </ScrollView>
  );
}

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  movieImageStyle: {
    width: 250,
    height: 300,
  },
  moviesDetailsStyle: {
    alignItems: 'center',
  },
  movieNameAndYearStyle: {
    marginVertical: 16,
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  yearStyle: {
    fontSize: 18,
    color: 'grey',
  },
});
