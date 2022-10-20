from app import db
from datetime import datetime

# class TypeOfShooting(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     package_id = db.Column(db.String(64), db.ForeignKey('package.id'))
#
#     def __repr__(self):
#         return '<ID пакета: {}>'.format(self.package_id)

class Package(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    package_name = db.Column(db.String(120), index=True, unique=True)
    rus_name = db.Column(db.String(120), index=True)
    type_name = db.Column(db.String(120))
    base_service = db.Column(db.String(1000))
    base_price = db.Column(db.Integer)
    type = db.Column(db.String(1000))


    def __repr__(self):
        return f'<Имя пакета: {self.rus_name}>,' \
               f'<Базовые услуги: {self.base_service}>,' \
               f'<Базовая стоимость: {self.base_price}>'

class AdditionalServices(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    add_service = db.Column(db.String(1000))
    add_price = db.Column(db.Integer)
    type_package = db.Column(db.String(64))

    def __repr__(self):
        return f'<Услуга: {self.add_service}>,' \
               f'<Cтоимость: {self.add_price}>'

class Orders(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    package_name = db.Column(db.String(120))
    add_services = db.Column(db.String(1000))
    name = db.Column(db.String(150))
    phone = db.Column(db.String(20))
    comments = db.Column(db.String(1000))
    wed_date = db.Column(db.DateTime)
    results_storage = db.Column(db.Boolean)
    transporting = db.Column(db.Boolean)
    publish = db.Column(db.Boolean)
    date_order = db.Column(db.DateTime, default=datetime.utcnow())
