import telegram
from config import Config


class WeddingBot:
    def __init__(self):
        conf = Config
        bot_access_token = conf.bot_access_token
        self.chat_id = conf.TELEGRAM_chat_id
        self.bot = telegram.Bot(token=bot_access_token)

    def public_post(self, msg):
        text = msg
        self.bot.sendMessage(chat_id=self.chat_id, text=text, parse_mode=telegram.ParseMode.HTML)