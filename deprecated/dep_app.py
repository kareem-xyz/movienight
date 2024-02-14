# DEPRECATED FOR NOW
"""
@app.route('/compare', methods=['POST'])
def compare():
    choices = []
    choices.append(request.form.get('id_0'))
    choices.append(request.form.get('id_1'))

    # Api requests
    url = "https://moviesdatabase.p.rapidapi.com/titles/" # + /movie_id

    # returns all information on the title
    querystring = {"info":"custom_info"}

    headers = {
        "X-RapidAPI-Key": "dcabfff8b1msh47092185488eb22p1b47e2jsn45e1e47ab1f7",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
    }
    #  Request data
    response_0 = requests.get(url + choices[0], headers=headers, params=querystring)
    response_1 = requests.get(url + choices[1], headers=headers, params=querystring)

    # Convert to json for exchanging data
    json_0 = response_0.json()
    json_1 = response_1.json()

    return render_template('compare.html', m0=json_0["results"], m1=json_1["results"])
"""