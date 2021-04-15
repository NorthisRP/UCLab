from article import Article
import pymongo

client = pymongo.MongoClient("mongodb+srv://roman:450299@cluster0.yym2f.mongodb.net/UCLab?retryWrites=true&w=majority")
db = client.UCLab

class Database():
    def __init__(self, article:Article):
        self.article = article
    @staticmethod
    def create_article(self):
        try:
            collection = db.Articles
            # collection.insert_one(
            #     {
            #         "header":self.header,
            #         "description":self.description,
            #         "date":self.date,
            #         "category":self.category
            #     })
        except Exception as e:
            print(e)

