import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
// Home Page Styling
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
  },
  carousel: {
    flexDirection: 'row',
  },
  item: {
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  poster: {
    width: '100%',
    height: windowHeight,
    resizeMode: 'contain',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    zIndex: 100,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 10,
  },
  arrowLeft: {
    left: 10,
  },
  arrowRight: {
    right: 10,
  },
  thumbs: {
    position: 'absolute',
    zIndex: 10,
    flex: 1, 
    flexDirection: 'column',
  }
});

export default styles;
