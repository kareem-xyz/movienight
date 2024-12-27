// This file contains the helper functions for each question. The helper function is what adds special changes to each questions. The Functino RunQuestionCheck is used to iterate over all the helper functions. it takes into consideration no input for each helper function. 


// Use the `eval()` function to convert the string to a function call
function RunQuestionCheck(question_no)
{
    // question_id is the 'q' + number of question. So first question is 'q0' for example.
    q_id = `q${question_no}`
    eval(`${question_id}_helper()`);
}

// Adds the similar movies part to the "somewhat of a helper function for the similar movies question"
function helper_simMovies(){
    // Read data
    simMovies_q = 'q3'
    m0_simMovies = JSON.parse(sessionStorage.getItem('choice_0'))['similarMovies']
    m1_simMovies = JSON.parse(sessionStorage.getItem('choice_1'))['similarMovies']
    length_AllSimMovies = m0_simMovies.length + m1_simMovies.length;
    max_options = Math.round(length_AllSimMovies / 3);
    QUESTIONS[simMovies_q]['options']['max'] = max_options
    // Inside function
    function addSimMoviesToQuestions(movie_no_str, simMoviesList)
    {
        let simMovies_q = 'q3';
        key_index = Object.keys(QUESTIONS?.[simMovies_q]?.['options']?.['keys']).length !== undefined ? Object.keys(QUESTIONS[simMovies_q]['options']['keys']).length : 0;//to determine where to push key
        for (i in simMoviesList){
        let key = {}
        key['id'] = `o${key_index}`;
        key['text'] = simMoviesList[i]?.['titleText']?.['text'];
        key['image'] = simMoviesList[i]?.['primaryImage']?.['url'];
        key['rel_movie'] = Number(movie_no_str);
        key['value'] = 1;
        QUESTIONS[simMovies_q]['options']['keys'][`o${key_index}`] = key;
        key_index++;
    }
}   
    // add to QUESTIONS
    addSimMoviesToQuestions('0', m0_simMovies);
    addSimMoviesToQuestions('1', m1_simMovies);
}

// dynamically populates the q2 with options based on the keywords (genres and themes) of each movie movies
function helper_q2() {
    // extract and remove overlapping keywords
    kWords = [[],[]]

    objs = [
        JSON.parse(sessionStorage.getItem('choice_0')), 
        JSON.parse(sessionStorage.getItem('choice_1'))
    ]
        for (m = 0; m < objs.length; m++) {
            // reference to list of genres and themes of movie object
            g_array = objs[m]['genres']['genres']
            t_array = objs[m]['keywords']['edges']

            // genres collection loop
            for (g = 0; g < g_array.length; g++) {
                kWords[m].push(g_array[g]['text'])
            }
            // themes collection loop
            for (t = 0; t < t_array.length; t++) {
                kWords[m].push(t_array[t]['node']['text'])
            }
        }
    kWords = removeOverlap(kWords[0], kWords[1])

    // Populate questions.json with keywords (includes other information)
    o_count = 0 // do not change
    for (m=0; m < kWords.length; m++) {
        for (k = 0; k < kWords[m].length; k++, o_count++) {
            key = {
                "id": `o${o_count}`,
                "text": `${kWords[m][k]}`,
                "value": "3",
                "rel_movie": m
            }
            QUESTIONS['q2']['options']['keys'][`o${o_count}`] = key
            QUESTIONS['q2']['options']['max'] = Math.round(o_count / 2.5)
    }
}
console.log('Question 2 Populated')
}

// calculates time score deviation
function calculateTimeScore(t, t0) {     // t is actual, t0 is goal
    // Ensure the score doesn't drop below 0
    const deviationLimit = 3600; // One hour deviation in seconds
    return (3 * (1 - Math.abs(t - t0) / deviationLimit));
}
// Calculates a score for each movies based on its variance from a base vote count value.
// Base value is: rating = 7, vote = 10000, then score = 8
function calculateRatingScore(rating, votes) {
    const BASE_VOTES = 500000;
    const MAX_ADJUSTMENT = 2; // Maximum adjustment value

    let adjustment = 0;
    if (votes) {
        adjustment += (votes - BASE_VOTES) * (1 / rating) / BASE_VOTES;
        adjustment = Math.min(adjustment, MAX_ADJUSTMENT); // Cap the adjustment to 2 points
    }
    return rating + adjustment;}
