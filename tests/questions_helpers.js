// Use the `eval()` function to convert the string to a function call
function RunQuestionCheck(question_id){
    // question_id is the 'q' + number of question. So first question is 'q0' for example.
    eval(question_id + "_helper()");
}

// Helper functions are because each question has a different input way to add its answers
// All functions take the answers from the ANSWERS object.
function q0_helper(answer){
}