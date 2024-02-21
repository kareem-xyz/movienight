// some work should be done in this to adjust number of questions accordingly. for example if both questions are for adults.
const totalQuestions = Object.keys(QUESTIONS).length // Get length of object (quite annoying)
const ANSWERS = {}
const POINTS = {
    'm0': {},
    'm1': {}
}
for (let i = 0; i < totalQuestions; i++)
{
    POINTS['m0'][`q${i}`] = {};
    POINTS['m1'][`q${i}`] = {};
}
let current_q = -1;

const q_type_functions = 
{
    'multiSelect' : saveAnswer_multiSelect(),
    'singleSelect' : saveAnswer_singleSelect()
}

// Configure Radio buttons in quiz to record answers
let radioButtons = document.querySelectorAll('.q-option');
radioButtons.forEach(button =>
{
button.addEventListener('click', saveAnswer(button)) // Save answer
q_type = QUESTIONS[button.id.slice(0,2)]['type']
q_type_functions[''];
});

// Renders each question to the html file, based on the type of the question and its options.
function renderQuestion(q_id)
{
    // Render the Question Div
    let question = document.createElement('div');
    question.classList.add('mb-4', 'question', 'display-hide')
    question.id = q_id
    let q_object = QUESTIONS[q_id]
    let q_no = Number(q_id.charAt(1)); // Convert to int
    let q_text = q_object['text'];

    // Render Question text
    let text_html = `<h5>${q_no}. ${q_text}</h5>`;
    question.innerHTML = text_html;

    // Render Question Answer Keys
    answers_html = GenerateAnswersHTML(q_id);
    question.insertAdjacentHTML('beforeend', answers_html);

    // Add Question to Webpage
    document.getElementById('questions').appendChild(question)
}

// Takes the whole question object (eg QUESTIONS['q0']) and add answers html to the html file. 
// (Requires the question to be in the html already.)
function GenerateAnswersHTML(q_id)
{
    let q_object = QUESTIONS[q_id]
    let q_no = q_id.charAt(1)
    // if Question is of type singleSelect
    if (q_object['type'] == 'singleSelect')
    {
        let keys_html = '';
        // Render the singleSelect answer keys (all are of type text)
        for (let k in q_object['options']['keys'])
        {
            key = q_object['options']['keys'][k]
            _no = k.charAt(1)
            // Render Elements of answer
            let inputElement = `<input type='radio' class='btn-check q-option' name='options-base${q_no}' id='${q_id}-option${_no}' value='${key['value']} data-related-movie=''>`
            let labelElement = `<label class='m-2 btn btn-outline-light' for='${q_id}-option${_no}'>${key['text']}</label>`
            let key_html = inputElement + labelElement;
            keys_html += key_html;
        }
        return keys_html;
    }

    // if question is of type multiSelect
    else if (q_object['type'] == 'multiSelect'){
        // should generate a new type of input and label elements that will support multi select up to a certain limit. have to read into bootstrap again and might have to use a variable to limit the number of answers ( perhaps using ANSWERS[]) but this is part of the scoring so will ignore for now and focus on rendering questions and changing between them.
    }

}
// Move between questions in the quiz
function changeQuestion(direction)
{
    console.log(`Before function: current_q: q${current_q}`);
    switch(direction)
    {
      case 'next':
        if (current_q >= 0 && current_q < totalQuestions - 1) // Using total_q-1 because current_q starts from 0.
        {
            // Hide current question, show next question
            document.getElementById(`q${current_q}`).style.display = 'none';
            document.getElementById(`q${++current_q}`).style.display = 'inline-block';
            
            // save answers for previous question
            saveAnswer(`q${current_q-1}`);
        }

        // if reached last Question
        if (current_q == totalQuestions - 1)
        {  
            document.getElementById('nextQuestionButton').style.visibility = 'hidden';
            document.getElementById('finishQuizButton').style.display = 'inline-block';

            // did not write html yet
            // on its click start calculating scores and points. (server side if you want to keep the system hidden)
        }
        // Always show previous button on changing to next.
        document.getElementById('previousQuestionButton').style.visibility = 'visible'
        break;

      case 'previous':
        // If changing within range
        if (current_q > 0 && current_q <= totalQuestions - 1) // Using total_q-1 because current_q starts from 0.
        {
            // Hide current question, show previous question
            document.getElementById(`q${current_q}`).style.display = 'none';
            document.getElementById(`q${--current_q}`).style.display = 'inline-block';
            
            // save answers for previous question
            saveAnswer(`q${current_q+1}`)
        }

        if (current_q == 0){
            // hide previous question button
            document.getElementById('previousQuestionButton').style.visibility = 'hidden';
        }

        // Always show Next question button on changing to previous.
        document.getElementById('nextQuestionButton').style.visibility = 'visible'
        break;

      case 'start':
        // Remove button, show first question, and next question button
        document.getElementById('startQuizButton').remove();
        document.getElementById('questions').style.display = 'inline-block';
        document.getElementById('nextQuestionButton').style.visibility = 'visible';
        document.getElementById(`q${++current_q}`).style.display = 'inline-block';
    
    // Idk if this will ever trigger :)
    default:
        console.log('DO NOT MESS WITH MY WEBPAGE PLEASE. I can barely write code, so might have put a Remove("C/System32") somewhere')
    }
    console.log(`After function: current_q: q${current_q} \n`)
}

function saveAnswer(input)
{
// let q_id = (input.id).slice(0,2)
// ANSWERS[q_id] = input.value
}

// Ran from ANSWERS. scores points for each selected option. Should not add more points per multiple clicks. 
function saveAnswer_multiSelect(input)
{

// let related_movie = input.getAttribute('data-related-movie')
// let q_id = (input.id).slice(0,2)
//     POINTS[related_movie][q_id]
}

function saveAnswer_singleSelect(input)
{
}