from app import application

from app import routes, models, send_mail, send_telegram
if __name__ == "__main__":
   application.run(debug=False)