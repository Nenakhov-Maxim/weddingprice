import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'sdfjk7865432wedfgbhntj76543'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
                              'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    EMAIL_LOGIN = 'order@weddingprice.ru'
    EMAIL_PASSWORD = '55369100Max'
    HOST = "server152.hosting.reg.ru"
    TELEGRAM_chat_id = "-1001838710767"
    bot_access_token = "5692158136:AAGaP-CReaNsGXlPEwKJHPGKviqd5FhScKI"
    SEND_TO = ['trg1101@yandex.ru', 'STS_71@mail.ru']
