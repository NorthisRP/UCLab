from datetime import datetime


# Работа с данными статей

class Article(object):
    def __init__(self, header, description, date, category, image, filecode): #
        """Constructor"""
        self.header = header
        self.description = description
        self.date = date
        self.category = category
        self.image = image
        self.filecode = filecode

    def save(self):
        #метод для сохранения картинок и pdf на сервер
        #заменяет значения полей image и file на путь к сохраненнным файлам
        pass

    # def into_json(self):
    #     return {'header':self.header,
    #             'description':self.description,
    #             'date':self.date,
    #             'category':self.category}
    


