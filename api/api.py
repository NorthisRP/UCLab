from flask import Flask, request, redirect, url_for, render_template
from article import Article
from db import Database

app = Flask(__name__)
    
@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

@app.route('/admin', methods=['POST'])
def admin():
    header = request.form["header"]
    description = request.form["description"]
    date = request.form["date"]
    category = request.form["category"]
    image = 0
    filecode = 0
    try:
        article = Article(header, description, date, category, image, filecode)
        print(article.header)
        Database.create_article(article)
        return redirect(url_for("/blog"))
    except Exception as e:
        print(e)
    return render_template("index.html")

# @app.route('/api', methods=['GET'])
# def api():
#     articles = []

if __name__ == '__main__':
    app.run(debug=True)    