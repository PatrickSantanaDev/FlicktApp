import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/ReviewsStyles';

const ReviewsPage = ({ route, navigation }) => {
    const [reviewText, setReviewText] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isRec, setIsRec] = useState(false);
    const movie = route.params.movie;
    const username = route.params.user.username;
    const handleDeleteAllReviews = async () => {
        const deleteUrl = 'https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user={movierater}';

        try {
            const response = await fetch(deleteUrl, { method: 'POST' });
            if (!response.ok) {
                console.error(`HTTP Error: ${response.status} ${response.statusText}`);
                throw new Error('Network response was not ok');
            }

            setReviews([]);
            console.log("All reviews successfully deleted");
        } catch (error) {
            console.error('Error deleting reviews:', error);
        }
    };

    // Calculate the average user rating based on existing reviews
    const calculateAverageRating = () => {
        if (reviews.length === 0) {
            return 0; // No reviews, return 0
        }

        // Sum all the ratings for the specific movie
        const totalRating = reviews.reduce((sum, review) => sum + review.Rating, 0);

        // Divide the total rating by the number of reviews to get the average
        return totalRating / reviews.length;
    };


    // Render stars based on the average user rating
    const renderAverageRatingStars = () => {
        const averageRating = calculateAverageRating();
        return (
            <Text>
                {renderStars(averageRating)}
            </Text>
        );
    };

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const url = 'https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user={movierater}';
                const response = await fetch(url);
                const jsonResponse = await response.json();

                if (!jsonResponse || jsonResponse.length === 0) {
                    console.log('Response is empty/no data');
                    return;
                }

                // Find current user and their friends
                const currentUser = jsonResponse.find(userJSON => userJSON.username === username);
                const friendsUsernames = currentUser ? currentUser.friends.map(friend => friend.username) : [];

                const friendReviews = [];
                for (const user of jsonResponse) {
                    if (friendsUsernames.includes(user.username)) {
                        const userReviews = user.rates.filter(review => review.Title === movie.Title)
                            .map(review => ({
                                ...review,
                                username: user.username // Add username into each review object
                            }));
                        friendReviews.push(...userReviews);
                    }
                }

                console.log(friendReviews);
                setReviews(friendReviews);
            } catch (error) {
                console.error('Error loading reviews:', error);
            }
        };

        loadReviews();
    }, [movie.Title, username]);



    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Icon key={i} name={i < rating ? 'star' : 'star-o'} size={12} style={styles.starIcon} />
        ));
    };


    const renderUserRatingStars = () => {
        return [...Array(5)].map((_, i) => (
            <TouchableOpacity key={i} onPress={() => setUserRating(i + 1)}>
                <Icon name={i < userRating ? 'star' : 'star-o'} size={30} color={i < userRating ? "#FFD700" : "#000"} style={styles.starIcon} />
            </TouchableOpacity>
        ));
    };
    const handleRec = async () => {
        const loadUrl = 'https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user={movierater}';
        const saveUrl = 'https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user={movierater}';

        try {
            const loadResponse = await fetch(loadUrl);

            if (!loadResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const userProfile = await loadResponse.json();

            if (!userProfile) {
                console.log('Response is empty');
                return;
            }

            const existingUserIndex = userProfile.findIndex(userJSON => userJSON.username === username);

            if (existingUserIndex !== -1) {
                const existingUser = userProfile[existingUserIndex];
                const updatedRec = existingUser.recMovies || [];
                const movieExistsIndex = updatedRec.findIndex(movieJSON => movieJSON.Title === movie.Title);

                if (movieExistsIndex !== -1) {
                    // Remove the movie from recMovies if it exists
                    updatedRec.splice(movieExistsIndex, 1);
                    setIsRec(false);
                    console.log('Movie removed from recMovies');
                } else {
                    // Add the movie to recMovies if it doesn't exist
                    updatedRec.push(movie);
                    setIsRec(true);
                    console.log('Movie added to recMovies');
                }

                existingUser.recMovies = updatedRec;

                const uniqueMovies = Array.from(new Map(updatedRec.map(movie => [movie.imdbID, movie])).values());
                const updatedProfile = JSON.parse(JSON.stringify(userProfile));

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedProfile), // Send the modified copy
                };

                const saveResponse = await fetch(saveUrl, requestOptions);

                if (!saveResponse.ok) {
                    throw new Error('Failed to save review data');
                }

                console.log("Recommended data successfully updated on server");
            } else {
                console.log('User not found');
                return;
            }
        } catch (error) {
            console.error('Error processing recommended data:', error);
            setIsRec(false);
        }
    };


    const handleSubmit = async () => {
        const newReviewData = {
            Title: movie.Title,
            Rating: userRating,
            Text: reviewText,
        };

        const loadUrl = 'https://cs.boisestate.edu/~scutchin/cs402/codesnips/loadjson.php?user={movierater}';
        const saveUrl = 'https://cs.boisestate.edu/~scutchin/cs402/codesnips/savejson.php?user={movierater}';

        try {
            const loadResponse = await fetch(loadUrl);

            if (!loadResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const userProfile = await loadResponse.json();

            if (!userProfile) {
                console.log('Response is empty');
                return;
            }

            const existingUser = userProfile.find(userJSON => userJSON.username === username);

            if (existingUser) {
                const existingReviewIndex = existingUser.rates.findIndex(review => review.Title === movie.Title);

                if (existingReviewIndex !== -1) {
                    // User has already reviewed this movie, update the review
                    existingUser.rates[existingReviewIndex] = newReviewData;
                    alert('Your previous review has been updated!');
                } else {
                    // User hasn't reviewed this movie, add a new review
                    existingUser.rates.push(newReviewData);
                }

                // Deep clone the userProfile before sending it
                const updatedProfile = JSON.parse(JSON.stringify(userProfile));

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedProfile), // Send the modified copy
                };

                const saveResponse = await fetch(saveUrl, requestOptions);

                if (!saveResponse.ok) {
                    throw new Error('Failed to save review data');
                }

                // Update local state with the new or updated review
                setReviews(prevReviews => {
                    const updatedReviews = [...prevReviews];
                    if (existingReviewIndex !== -1) {
                        updatedReviews[existingReviewIndex] = { ...newReviewData, username: username };
                    } else {
                        updatedReviews.push({ ...newReviewData, username: username });
                    }
                    return updatedReviews;
                });

                // Reset inputs and set submission state
                setReviewText('');
                setUserRating(0);
                setIsSubmitted(true);

                setTimeout(() => setIsSubmitted(false), 3000);

                console.log("Review data successfully updated on server");
            } else {
                console.log('User not found');
                return;
            }
        } catch (error) {
            console.error('Error processing review data:', error);
            setIsSubmitted(false);
        }
    };



    if (!movie) return null;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.movieTitle}>{movie.Title}</Text>
                <Text style={styles.movieYear}>({movie.Year})</Text>
                <View style={styles.movieRating}>
                    {renderAverageRatingStars()}
                </View>
            </View>
            <View style={styles.movieHeader}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.movieGenreHeader}>Genre:</Text>
                    <Text style={styles.movieGenre}>{movie.Genre}</Text>
                    <Text style={styles.movieRuntimeHeader}>Runtime:</Text>
                    <Text style={styles.movieRuntime}>{movie.Runtime}</Text>
                    <Text style={styles.movieStarringHeader}>Starring:</Text>
                    <Text style={styles.movieStarring}>{movie.Actors}</Text>
                    <Text style={styles.movieDescriptionHeader}>Description:</Text>
                    <Text style={styles.movieDescription}>{movie.Plot}</Text>
                </View>
                <Image source={{ uri: movie.Poster }} style={styles.moviePoster} />
            </View>
            <View style={styles.reviewsContainer}>
                <Text style={styles.friendReviewsHeader}>Friend Reviews:</Text>
                <ScrollView nestedScrollEnabled={true}>
                    {reviews.map((review, index) => (
                        <View key={index} style={styles.reviewItem}>
                            <Text style={styles.reviewText}>"{review.Text}"</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {renderStars(review.Rating)}
                            </View>
                            <Text style={styles.reviewText}>- {review.username}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.addReviewContainer}>
                <Text style={styles.addReviewTitle}>Add Rating/Review</Text>
                <Text style={styles.starRatingHeader}>Select star rating:</Text>
                <View style={styles.userRating}>
                    {renderUserRatingStars()}
                </View>
                <TextInput
                    style={styles.reviewTextInput}
                    onChangeText={setReviewText}
                    value={reviewText}
                    placeholder="Add a Text Review"
                    multiline
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>
                        {isSubmitted ? "Success!" : "Submit"}
                    </Text>
                </TouchableOpacity>
                <Text />
                <TouchableOpacity style={styles.submitButton} onPress={handleRec}>
                    <Text style={styles.submitButtonText}>
                        {isRec ? "Delete Recommendation" : "Add to Recommended Movies"}
                    </Text>

                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAllReviews}>
                    <Text style={styles.deleteButtonText}>Delete All Reviews</Text>
                </TouchableOpacity> */}
            </View>
        </ScrollView>
    );
};

export default ReviewsPage;
