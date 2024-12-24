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
    simMovies_q = 'q5'
    m0_simMovies = JSON.parse(sessionStorage.getItem('choice_0'))['similarMovies']
    m1_simMovies = JSON.parse(sessionStorage.getItem('choice_1'))['similarMovies']
    length_AllSimMovies= m0_simMovies.length + m1_simMovies.length;
    max_options = length_AllSimMovies <= 6 ? length_AllSimMovies : 6;
    QUESTIONS[simMovies_q]['options']['max'] = max_options
    // Inside function
    function addSimMoviesToQuestions(movie_no_str, simMoviesList)
    {
        let simMovies_q = 'q5';
        key_index = Object.keys(QUESTIONS?.[simMovies_q]?.['options']?.['keys']).length !== undefined ? Object.keys(QUESTIONS[simMovies_q]['options']['keys']).length : 0;//to determine where to push key
        for (i in simMoviesList){
        let key = {}
        key['id'] = `o${key_index}`;
        key['text'] = simMoviesList[i]?.['titleText']?.['text'];
        key['image'] = simMoviesList[i]?.['primaryImage']?.['url'];
        key['relatedMovie'] = `m${movie_no_str}`;
        key['value'] = 1;
        QUESTIONS[simMovies_q]['options']['keys'][`o${key_index}`] = key;
        key_index++;
    }
}   
    // add to QUESTIONS
    addSimMoviesToQuestions('0', m0_simMovies);
    addSimMoviesToQuestions('1', m1_simMovies);
}

function helper_q2() {
    // fill keywords questions with relevant keywords.
    genres = [[],[]]
    objs = [JSON.parse(sessionStorage.getItem('choice_0')), 
        JSON.parse(sessionStorage.getItem('choice_1'))]
        for (m = 0; m < objs.length; m++) {
            g_array = objs[m]['genres']['genres']
            for (g = 0; g < g_array.length; g++) {
                genres[m].push(g_array[g]['text'])
            }
        }
    print(genres)
    genres = removeOverlap(genres[0], genres[1])

    o = 0
    for (m=0; m < genres.length; m++) {
        for (g = 0; g < genres[m].length; g++, o++) {
            key = {
                "id": `o${o}`,
                "text": `${genres[m][g]}`,
                "value": "2",
                "rel_movie": m
            }
            QUESTIONS['q2']['options']['keys'][`o${o}`] = key
    }
}
console.log('Question 2 Populated')
}

