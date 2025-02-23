import httpx
import asyncio

# Used in each API request.
headers = {
    "X-RapidAPI-Key": "dcabfff8b1msh47092185488eb22p1b47e2jsn45e1e47ab1f7",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
}

# Run async functions with asyncio.run
def run_async(func):
    return asyncio.run(func)

# Get Data for one movie (synchronous)
async def get_movie_info(title, params):
    base_url = 'https://moviesdatabase.p.rapidapi.com/titles/search/title/'
    async with httpx.AsyncClient() as client:
        response = await client.get(base_url + title, headers=headers, params=params)
        return response.json()['results']

# Get Data for a list of Movies (synchronous)
async def get_all_movies_info(IDs_list):
    base_url = 'https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids'
    csv_IDs_list = ','.join(IDs_list)
    querystring = {"idsList": csv_IDs_list, 'info': 'custom_info'}
    async with httpx.AsyncClient() as client:
        response = await client.get(base_url, headers=headers, params=querystring)
        return response.json()['results']

# Given a list of actors' data, find the movies for each actor and return a list of movie IDs
async def get_actors_movies(lst):
    movie_ID_list = []
    for index, actor in enumerate(lst):
        try:
            # Assuming actor['results']['knownForTitles'] is a string of movie IDs
            movie_ID_list += actor['results']['knownForTitles'].split(',')
        except Exception as e:
            print(f'Error at index {index}')
            print(e)
            continue
    return movie_ID_list

# Data for list of actors (async), takes list of cast IDs
async def get_all_actors_info(cast_list):
    coroutines = [get_actor_info(actor_id) for actor_id in cast_list]
    return await asyncio.gather(*coroutines)

# Data for One actor (async), takes a single actor ID
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

# Remove overlap between two lists
def remove_overlap(list0, list1):
    set0 = set(list0)
    set1 = set(list1)

    # Find unique strings in set0 that are not in set1
    unique_list0 = set0 - set1

    # Convert set back to list
    return list(unique_list0)
