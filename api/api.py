from flask import Flask
app = Flask(__name__)

@app.route('/api', methods=['GET'])
def api():
    return{
        'status': 'first request'
    }

if __name__ == '__main__':
    app.run(debug=True)    