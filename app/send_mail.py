import smtplib

class SendMail():
    def __init__(self, text):
        self.HOST = "mail.weddingprice.ru"
        self.SUBJECT = 'Поступил новый заказ через форму сайта'
        self.TO = 'Nenakhov.Max@yandex.ru'
        self.FROM = 'order@weddingprice.ru'
        self.text = text
        self.BODY = '\r\n'.join(("From: %s" % self.FROM, "To: %s" % self.TO, "Subject: %s" % self.SUBJECT, "", self.text))
        self.send_mail()

    def send_mail(self):
        server = smtplib.SMTP(self.HOST)
        server.login('order@weddingprice.ru', "55369100Max")
        server.sendmail(self.FROM, [self.TO], self.BODY.encode('utf-8'))
        server.quit()
