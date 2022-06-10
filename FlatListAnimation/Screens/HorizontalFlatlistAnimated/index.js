import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovies} from './Api';

export default function HorizontalFlatlist() {
  const [movies, setMovies] = useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();

      setMovies([{key: 'empty-left'}, ...movies, {key: 'empty-right'}]);
    };

    if (movies.length === 0) {
      fetchData(movies);
    }
      console.log(movies);

  }, [movies]);

  return (
    <View>
      <Text>Horizaltal flatlist</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
