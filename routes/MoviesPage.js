import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/Styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OMDB_API_KEY = '942c9b75';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const scrollViewRef = useRef(); // Reference to the ScrollView
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const searchMovies = async () => {
      const keywords = ['christmas', 'holiday'];
      try {
        const responses = await Promise.all(
          keywords.map((keyword) =>
            fetch(
              `http://www.omdbapi.com/?s=${encodeURIComponent(
                keyword
              )}&apikey=${OMDB_API_KEY}`
            ).then((response) => response.json())
          )
        );

        const combinedMovies = responses.flatMap((response) => response.Search || []);
        const uniqueMovies = Array.from(new Map(combinedMovies.map((movie) => [movie.imdbID, movie])).values());

        setMovies(uniqueMovies);
      } catch (error) {
        console.error(error);
      }
    };

    searchMovies();
  }, []);

  const scrollLeft = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    scrollViewRef.current.scrollTo({ x: newIndex * windowWidth, animated: true });
    setCurrentIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex = Math.min(currentIndex + 1, movies.length - 1);
    scrollViewRef.current.scrollTo({ x: newIndex * windowWidth, animated: true });
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={scrollLeft} style={[styles.arrow, styles.arrowLeft]}>
        <Icon name="chevron-back" size={30} color="black" />
      </TouchableOpacity>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        style={styles.carousel}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / windowWidth);
          setCurrentIndex(index);
        }}
      >
        {movies.map((movie, index) => (
          <View key={index} style={styles.item}>
            <Image source={{ uri: movie.Poster }} style={styles.poster} />
            <Text style={styles.movieTitle}>{movie.Title}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={scrollRight} style={[styles.arrow, styles.arrowRight]}>
        <Icon name="chevron-forward" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

