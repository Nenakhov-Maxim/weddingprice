import smtplib, ssl
from config import Config


class SendMail:
    def __init__(self, text):
        conf = Config
        self.HOST = conf.HOST
        self.email_login = conf.EMAIL_LOGIN
        self.host_psw = conf.EMAIL_PASSWORD
        self.SUBJECT = 'Поступил новый заказ через форму сайта'
        self.TO = conf.SEND_TO
        self.FROM = 'order@weddingprice.ru'
        self.text = text
        self.BODY = '\r\n'.join(("From: %s" % self.FROM, "To: %s" % self.TO, "Subject: %s" % self.SUBJECT, "", self.text))
        self.context = ssl.create_default_context()

    def send_mail(self):
        with smtplib.SMTP_SSL(self.HOST, 465, context=self.context) as server:
            server.login(self.email_login, self.host_psw)
            server.sendmail(self.FROM, self.TO, self.BODY.encode('utf-8'))
