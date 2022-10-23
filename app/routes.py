import json
import email, smtplib, ssl
from flask import render_template, url_for, redirect, flash, jsonify, request
from app.forms import file_list_form_builder
from app import application, db
from app.models import Package, AdditionalServices, Orders



@application.shell_context_processor
def make_shell_context():
    return {'db': db, 'package': Package, 'add_services': AdditionalServices}


@application.route('/')
@application.route('/index')
def index():
    base_price_photo_row = db.session.query(Package.base_price).filter(Package.type_name == 'фото').all()
    base_price_video_row = db.session.query(Package.base_price).filter(Package.type_name == 'видео').all()
    base_price_photo_video_row = db.session.query(Package.base_price).filter(Package.type_name == 'фото + видео').all()
    base_price_photo = []
    base_price_video = []
    base_price_photo_video = []

    for row in base_price_photo_row:
        base_price_photo.append(row[0])
    for row in base_price_video_row:
        base_price_video.append(row[0])
    for row in base_price_photo_video_row:
        base_price_photo_video.append(row[0])

    return render_template('index.html', title='Wedding Photographer', base_price_photo=base_price_photo,
                           base_price_video=base_price_video, base_price_photo_video=base_price_photo_video)

@application.route('/index/<id>/order', methods=['GET', 'POST'])
def modal(id):
    filling_modal = Package.query.filter_by(package_name=id).first()
    services_base = filling_modal.base_service.split(';')
    additional_services = []
    list_add_services = []
    add_services_price = {}
    filling_modal_add_services = AdditionalServices.query.filter_by(type_package=id.split('-')[0]).all()
    j = 0
    for add_service in filling_modal_add_services:
        list_add_services.append(add_service.add_service)
        add_services_price[f'filename_{j}'] = add_service.add_price
        j = j + 1

    form = file_list_form_builder(list_add_services)

    for i in range(len(list_add_services)):
        additional_services.append(f'filename_{i}')

    if form.validate_on_submit():
        add_to_database(form.data, id, form)
        return jsonify(status='ok')
    elif request.method == 'GET':
        pass
    else:
        data = json.dumps(form.errors, ensure_ascii=False)
        return jsonify(data)
    return render_template('_order_form.html', title=f'Вы выбрали "{filling_modal.type_name}", пакет "{filling_modal.rus_name}"',
                           form=form, add_serv=additional_services,
                           base_add=services_base,
                           add_prices=add_services_price)

def add_to_database(data, package_name, form):
    add_services = ''
    for item in data.items():
        if item[0].find('filename') != -1 and item[1] != False:
            add_services = add_services + form[item[0]].label.text + ';' + '\n'

    order = Orders(package_name=package_name, add_services=add_services, name=data['username'], phone=data['phone'],
                   wed_date=data['wedding_date'], comments=data['comments'], results_storage=int(data['result_storage']),
                   transporting=int(data['transporting']), publish=int(data['permission_to_publish']))
    db.session.add(order)
    db.session.commit()
    send_email(data, package_name, add_services)
    
    
def send_email(data, package_name, add_services):
    msg = f'''
    У вас новый заказ на сайте WeddingPrice.ru
    -------------------------------------------
    * Имя пакета: {package_name};
    * Дополнительные услуги, выбранные по желанию:
        {add_services};
    * Дата свадьбы: {data['wedding_date']};
    * Хранение результатов: {'1 месяц' if data['result_storage'] == '0' else 'бессрочное хранение'}
    * Перемещение: {'молодожены предоставляют машину' if data['transporting'] == '0' else 'фотограф перемещается на своей машине'}  
    * Разрешение на публикацию: {'не разрешаю' if data['permission_to_publish'] == '0' else 'разрешаю'}
    * Комментарий к заказу: {data['comments']}  
    -------------------------------------------
    КОНТАКТЫ:
    {data['username']} - {data['phone']}
    '''

    HOST = "server152.hosting.reg.ru"
    SUBJECT = 'Поступил новый заказ через форму сайта'
    TO = 'nenakhov.max@yandex.ru'
    FROM = 'order@weddingprice.ru'
    BODY = '\r\n'.join(("From: %s" % FROM, "To: %s" % TO, "Subject: %s" % SUBJECT, "", msg))
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(HOST, 465, context=context) as server:
        server.login('order@weddingprice.ru', "55369100Max")
        server.sendmail(FROM, [TO], BODY.encode('utf-8'))
        
    
        