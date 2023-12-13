import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFCCCC',
        marginTop: 50,
        // borderRadius: 5,
        borderWidth: 5,
        borderColor: 'black',
    },
    titleContainer: {
        alignItems: 'center',
        // backgroundColor: '#FFCCCC',
        padding: 5,
        marginTop: 10,
    },
    movieHeader: {
        flexDirection: 'row', // align details and poster side by side
        // backgroundColor: '#FFCCCC',
        padding: 10,
    },
    detailsContainer: {
        maxWidth: windowWidth / 2, // half the screen width
        marginLeft: 10,
        marginRight: 15, // spacing between the text and the image
    },
    moviePoster: {
        width: windowWidth / 4, 
        height: (windowWidth / 4) * 1.5,
        resizeMode: 'contain',
    },
    movieTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    movieYear: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    movieRating: {
        flexDirection: 'row', // stars in a row
        marginTop: 4,
        marginBottom: 20,
        fontSize: 16,
    },
    starIcon: {
        marginRight: 4,
        color: "#FFD700",
    },
    moviePoster: {
        width: 150,
        height: 225,
        resizeMode: 'contain',
    },
    movieGenreHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    movieGenre: {
        fontSize: 12,
        fontWeight: 'normal',
    },
    movieRuntimeHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    movieRuntime: {
        fontSize: 12,
        fontWeight: 'normal',
    },
    movieStarringHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    movieStarring: {
        fontSize: 12,
        fontWeight: 'normal',
    },
    movieDescriptionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    movieDescription: {
        fontSize: 12,
        fontWeight: 'normal',
    },
    reviewsContainer: {
        // flex: 1,
        maxHeight: 200,
        margin: 10,
        padding: 10,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'black',
        // backgroundColor: 'lightgray',
    },
    friendReviewsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    reviewItem: {
        // backgroundColor: 'white',
        padding: 15,
        // marginBottom: 10,
        alignItems: 'center',
    },
    reviewsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    reviewText: {
        fontSize: 12,
        textAlign: 'center',
    },
    addReviewContainer: {
        margin: 10,
        padding: 10,
        // backgroundColor: '#FFCCCC',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'black',
    },

    addReviewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        // marginVertical: 10,
    },
    starRatingHeader: {
        fontSize: 12,
        textAlign: 'center',
    },
    userRating: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'center',
    },
    reviewTextInput: {
        height: 100,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 3,
        marginBottom: 10,
        backgroundColor: 'lightgray',
        textAlignVertical: 'top',
        padding: 10,
    },
    submitButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
