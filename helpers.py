import requests # Used in the query Api
import httpx
import asyncio

# Used in each Api request.
headers = {
        "X-RapidAPI-Key": "dcabfff8b1msh47092185488eb22p1b47e2jsn45e1e47ab1f7",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
    }

def run_async(func):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(func)
    loop.close()
    return result


# get Data for one movie. Takes movie title and parameters as input.
def get_movie_info(title, params):
    base_url='https://moviesdatabase.p.rapidapi.com/titles/search/title/'
    response = requests.get(base_url + title, headers=headers, params=params)
    # Convert to json and return only the results
    return (response.json())['results']


# Data for list of Movies. Takes list of cast IDs.
def get_all_movies_info(IDs_list):
    base_url='https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids'
    csv_IDs_list = ','.join(IDs_list)
    querystring = {"idsList": csv_IDs_list, 'info': 'custom_info'}
    response = requests.get(base_url, headers=headers, params=querystring)
    # Convert to json and return only the results
    return (response.json())['results']


# Data for list of actors. Asyncio. Takes list of cast IDs.
async def get_all_actors_info(cast_list):
    coroutines = [get_actor_info(actor_id) for actor_id in cast_list]
    return await asyncio.gather(*coroutines)
    

# Data for One actor. Asyncio Takes a single actor ID.
async def get_actor_info(actor_id):
    base_url = 'https://moviesdatabase.p.rapidapi.com/actors/'
    async with httpx.AsyncClient() as client:
        response = await client.get(base_url + actor_id, headers=headers)
        return response.json()

# Function to cleanse JSON files from inherent incorrectly formatted double quotes
def replace_quotes(obj):
    if isinstance(obj, dict):
        return {key: replace_quotes(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [replace_quotes(item) for item in obj]
    elif isinstance(obj, str):
        return obj.replace('"', "'")
    else:
        return obj
    
def remove_overlap(list0, list1):
    # Convert lists to sets
    set0 = set(list0)
    set1 = set(list1)

    # Find unique strings in set
    unique_list0 = set0 - set1

    # Convert sets back to lists
    unique_list0 = list(unique_list0)

    return unique_list0
