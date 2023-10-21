from flask import Flask, jsonify, request
from google.cloud import bigquery

# Init Flask & BigQuery
app = Flask(__name__)
client = bigquery.Client.from_service_account_json('primal-pod-401712-dcbbeb5f006a.json')


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
        WHERE Name LIKE '%{search_query}%' 
        OR Artist LIKE '%{search_query}%'
        OR Album LIKE '%{search_query}%'
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


if __name__ == '__main__':
    app.run()
