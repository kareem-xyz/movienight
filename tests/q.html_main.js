const ANSWERS = {}
// Dict to hold inputed answers for each question. including true or false questions (conditionals), multiple choice questions and mnore. 
// Conditional questions will have a one value. eg if ANSWERS['q0']['type']='conditional' THEN ANSWERS['q0']['value'] = 'true' OR 'false'
// Multi select questions will have multiple values for each selected option. for example.
// if ANSWERS['q1']['type']='multiSelect' THEN :  ((for example question about similarmovies))


// Dict to hold inputed answers for each question. including true or false questions (conditionals), multiple choice questions and more. 
// Conditional questions will have a one value. eg if ANSWERS['q0']['type']='conditional' THEN ANSWERS['q0']['value'] = 'true' OR 'false'
// Multi select questions will have multiple values for each selected option. for example.
// if ANSWERS['q1']['type']='multiSelect' THEN :  ((for example question about similarmovies))
/* ANSWERS['q1']['value']= {
 v0: {
    'related_movie' : 'm0' or 'm1'   (((not sure yet if this will be needed in the points calculating stage or not)))
    'value' : '1' or 2 or 3 idk
  } 
 v1: {...} 
 }
 */
const totalQuestions = (document.getElementsByClassName('questions')).length // some work should be done in this to adjust number of questions accordingly. for example if both questions are for adults.
const POINTS = {
    'm0': {},
    'm1': {}
}
for (let i = 0; i < totalQuestions; i++)
{
    POINTS['m0'][`q${i}`] = {};
    POINTS['m1'][`q${i}`] = {};
}

const q_type_functions = 
{
    'multiSelect' : saveAnswer_multiSelect(),
    'singleSelect' : saveAnswer_singleSelect()
}

// Configure Radio buttons in quiz to record answers
let radioButtons = document.querySelectorAll('.q-option');
radioButtons.forEach(button => function(button)
{
button.addEventListener('click', saveAnswer(button)); // Save answer
q_type_functions[button.getAttribute('data-q-type')];
});


function saveAnswer(input)
{
let q_id = (input.id).slice(0,2)
ANSWERS[q_id] = input.value
};

// Ran from ANSWERS. cores points for each selected option. Should not add more points per multiple clicks. 
function saveAnswer_multiSelect(input)
{

let related_movie = input.getAttribute('data-related-movie')
let q_id = (input.id).slice(0,2)
    POINTS[related_movie][q_id]
}

function saveAnswer_singleSelect(input)
{


}