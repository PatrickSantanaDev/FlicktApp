import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList } from 'react-native';

import styles from '../../styles/MovieStyles';
import likedMovieStyles from '../../styles/LikedMovies.js';

const LikedMovies = ({ route }) => {
    const movies = Object.values(route.params); 
    console.log("Movies in here: ", movies);

    const data = Object.keys(movies).map(function(key) {
        return { key: key, ...movies[key] };
      });
      

    return (
        <View style={{flex: 1, flexDirection: 'col', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 25, marginBottom: 10}}>Your liked movies:</Text>
            {movies.map((movie, index) => (
                // <Image key={index} source={{ uri: movie.Poster }} style={likedMovieStyles.image}></Image>
                <Text>{movie?.Title}</Text>
            ))}
        </View>
    );
}

export default LikedMovies;