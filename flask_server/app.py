from flask import Flask, jsonify, request
from flask_cors import CORS
from google.cloud import bigquery

# Init Flask & BigQuery
app = Flask(__name__)
CORS(app)
client = bigquery.Client.from_service_account_json('flask_server/primal-pod-401712-dcbbeb5f006a.json')


@app.route('/')
def hello_world():
    return 'Hello, World!'


# ROUTE TO GET ALL SONGS
@app.route('/songs', methods=['GET'])
def retrieve_songs():
    try:
        # Define your BigQuery SQL query to retrieve songs
        query = "SELECT * FROM primal-pod-401712.datacampSongs.Songs"

        # Execute the query
        query_job = client.query(query)

        # Fetch the results
        results = query_job.result()

        # Convert the results to a list of dictionaries
        songs = [dict(row) for row in results]

        # Return the list of songs as JSON
        return jsonify(songs), 200

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500


# ROUTE TO SEARCH FOR A SONG
@app.route('/songs/search', methods=['GET'])
def search_songs():
    try:
        # Get the search query parameter from the request URL
        search_query = request.args.get('query')

        if not search_query:
            return jsonify({'error': 'Query parameter "query" is required'}), 400

        # Define your BigQuery SQL query to search for songs based on the query parameter
        query = f"""
        SELECT * FROM `primal-pod-401712.datacampSongs.Songs`
        WHERE LOWER(Name) LIKE LOWER('%{search_query}%') 
        OR LOWER(Artist) LIKE LOWER('%{search_query}%')
        OR LOWER(Album) LIKE LOWER('%{search_query}%')
        LIMIT 10
        """

        # Execute the query
        query_job = client.query(query)

        # Fetch the results
        results = query_job.result()

        # Convert the results to a list of dictionaries
        songs = [dict(row) for row in results]

        # Return the list of matching songs as JSON
        return jsonify(songs), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ROUTE TO SEARCH FOR A SONG BASED ON ITS ID
@app.route('/songs/<int:song_id>', methods=['GET'])
def get_song(song_id):
    try:
        # Define your BigQuery SQL query to search for songs based on the song id
        query = f"""
        SELECT * FROM `primal-pod-401712.datacampSongs.Songs`
        WHERE id = {song_id}
        """

        # Execute the query
        query_job = client.query(query)

        # Fetch the results
        results = query_job.result()

        # Convert the results to a list of dictionaries
        songs = [dict(row) for row in results]

        # Return the list of matching songs as JSON
        return jsonify(songs), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# ROUTE TO RECOMMEND A SONG
@app.route('/songs/recommend', methods=['GET'])
def recommend_songs():
    try:
        # Get the search query parameter from the request URL
        # search query must be the id of a song
        id_song = request.args.get('song_id')

        if not id_song:
            return jsonify({'error': 'Query parameter "song_id" is required'}), 400

        # The first query to get the cluster of the song
        query = f"""
        SELECT cluster FROM `primal-pod-401712.datacampSongs.Songs` where id = {id_song}
        """

        # Execute the query
        query_job = client.query(query)

        # Fetch the results
        cluster_song = query_job.result()

        cluster_song_list = [row for row in cluster_song]
        if not cluster_song_list:
            return jsonify({'error': 'No song found for the provided id'}), 404
        cluster_value = cluster_song_list[0].cluster

        # The second query to get the songs of the same cluster
        query = f"""
        SELECT * 
        FROM `primal-pod-401712.datacampSongs.Songs` 
        WHERE cluster = {cluster_value} AND id != {id_song}
        ORDER BY RAND() 
        LIMIT 5"""

        # Execute the query
        query_job = client.query(query)

        result = query_job.result()

        # Convert the results to a list of dictionaries
        songs = [dict(row) for row in result]

        # Return the list of matching songs as JSON
        return jsonify(songs), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.after_request
def add_cors_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "POST")
    return response


if __name__ == '__main__':
    app.run()
