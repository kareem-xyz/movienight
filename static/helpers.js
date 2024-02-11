// initialise variables for efficiency
var highlighted = [2]; // for css highlighting, stores button
const col_0 = document.getElementById("col_0");   // References html element of list 0
const col_1 = document.getElementById("col_1");   // References html element of list 1

// Initialise Arrays
for (let i = 0; i < 2; i++)
{
    highlighted[i] = ""
}


function showInputField(label)
{
   // Show child element
   child_id = label.id + '-input';
   document.getElementById(child_id).classList.add('display-show');
}
// Array to hold points for each question.
let points_per_q = [];
let points_total = 0;

// Run whenever a choose movie button is pressed to note the movie and makes sure to not conflict lists.
function choose(button)
{
    var movie = button;
    movie_list = movie.getAttribute("data-list");

    if (highlighted[movie_list])
    {
        // If same movie do nothing and return.
        if (highlighted[movie_list] == movie)
        {
            return
        };

        // Else, Remove highlight from the movie chosen before 
        highlighted[movie_list].classList.add("btn-outline-primary");
        highlighted[movie_list].classList.remove("btn-primary");
        highlighted[movie_list].innerHTML = "Choose";
    };
    
    // Highlight new chosen movie
    movie.innerHTML = "Chosen!";
    movie.classList.add("btn-primary");
    movie.classList.remove("btn-outline-primary");

    // Save
    highlighted[movie_list] = movie;

    // Update input field for search form
    document.getElementById(`movie${movie_list}`).value = movie.getAttribute("data-title");
    
    // Save the new movie's data for later form submission
    movie_index = movie.getAttribute("data-index");
    if (movie_list == '0'){
        sessionStorage.setItem('choice_0', JSON.stringify(datalist_0[Number(movie_index)]));
    }
    else {
        sessionStorage.setItem('choice_1', JSON.stringify(datalist_1[Number(movie_index)]));
    }
    return true;
}

function InputAndSubmit(event) {

    // Create a hidden input field to add choices
    var hiddenInput_0 = document.createElement('input');
    var hiddenInput_1 = document.createElement('input');

    hiddenInput_0.type = 'hidden';
    hiddenInput_1.type = 'hidden';

    hiddenInput_0.name = 'cast_0';
    hiddenInput_1.name = 'cast_1';
    
    // Currently sends the whole choice data (later on will refine to save data)
    hiddenInput_0.value = getMovieCast(sessionStorage.getItem('choice_0'));
    hiddenInput_1.value = getMovieCast(sessionStorage.getItem('choice_1'));

    // Check if function calls succeeded
    if (!(hiddenInput_0.value && hiddenInput_1.value))
    {
        console.error('CHOOSE BOTH MOVIES PLEASE');
        return false;
    }

    // Remove existing hidden inputs with the same names
    event.target.querySelectorAll('input[name="cast_0"]').forEach(el => el.remove());
    event.target.querySelectorAll('input[name="cast_1"]').forEach(el => el.remove());

    // Append the new hidden input field to the form
    event.target.appendChild(hiddenInput_0);
    event.target.appendChild(hiddenInput_1);

    // Continue with the form submission
    return true; // Returning true allows the form submission to proceed
}

function getMovieCast(movie) {
    // Catching Wrong in Input
    if (typeof movie != 'object'){
        if (typeof movie =='string'){
            try {
                movie = JSON.parse(movie)
              }
              catch(err) {
                console.error(err);
                return undefined;
              }
        }
        else {
            console.error('Movie passed wasn\'t a JS object, nor a string object in JSON format, nor an array.')
            return undefined;
        }
    }

    // Create an array to store values.
    let cast = [];

    // Add values from movie data
    cast.push(movie?.['directors']?.[0]?.['credits']?.[0]?.['name']?.['id'])
    cast.push(movie?.['creators']?.[0]?.['credits']?.[0]?.['name']?.['id'])
    cast.push(movie?.['writers']?.[0]?.['credits']?.[0]?.['name']?.['id'])

    let tmp = movie?.['principalCast']?.[0]?.['credits'];
    if (tmp)
    {
        for (let i = 0; i < tmp.length; i++)
        {
            cast.push(tmp[i]?.['name']?.['id'])
        }
    }
    
    // Clean array from undefined values
    for (i = 0; i < cast.length; i++)
    {
        if (cast[i] == undefined){
            cast.splice(i, 1);
        }
    }
    // return array of strings containing actors IDs.
    return cast;
}

