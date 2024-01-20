// List of forms
const list_form = Array.from(document.getElementsByTagName('form'));

// Used across pages to save input data and reuse it
// or the shorthand way : var input = {};
// Check is input object has been recorded to sessionstorage before
if (sessionStorage.getItem('input')) 
{
input = JSON.parse(sessionStorage.getItem('input'));
}
else 
{
    input = 
    {
        // m0 and m1 can be accessed using input.m0 or input.m1 because they are not indexers they are a property of the object
        'm0' : '',
        'm1' : ''
    }
}
    // Rerender input in name field
    document.getElementById('movie0').value = input['m0'];
    document.getElementById('movie1').value = input['m1'];

// Upon Each search request, save the movie names to local session storage
var searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function () 
{
    // Same new input name
    input['m0'] = document.getElementById('movie0').value;
    input['m1'] = document.getElementById('movie1').value;
    sessionStorage.setItem( 'input', JSON.stringify(input));
});


// initialise loading buttons
for (let i = 0; i < list_form.length; i++)
{
    // List of loading elements inside a form (elements that have this class should appear when loading and disappear when finished)
    const list_load_status = Array.from(list_form[i].getElementsByClassName('load-status'));
    
    // Listen for submit
    list_form[i].addEventListener('submit', function () 
    {
        // Show Loading (default on page load is display-hide present)
        for (let k = 0; k < list_load_status.length; k++)
        {
            list_load_status[k].classList.remove('display-hide');
        }
        return true;
    })
};

