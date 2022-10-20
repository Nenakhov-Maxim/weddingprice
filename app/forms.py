from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField, RadioField, IntegerField, DateField, TextAreaField, FieldList
from wtforms.validators import DataRequired

class OrderForm(FlaskForm):
    additional_services = FieldList(BooleanField(), 'Files')
    result_storage = RadioField('storage', choices=[('0', '1 месяц'),
                                                    ('1','Бессрочное хранение')], default='0')
    transporting = RadioField('transporting', choices=[('0', 'Молодожены предоставляют машину'),
                                                       ('1', 'Фотограф перемещается на своей машине')], default='0')
    permission_to_publish = RadioField('publish', choices=[('0', 'Не разрешаю'),
                                                       ('1', 'Разрешаю')], default='1')
    username = StringField('Ваше имя', validators=[DataRequired()])
    phone = IntegerField('Номер по которому с вами можно связаться', validators=[DataRequired()])
    wedding_date = DateField('Какая дата съемки вас интересует?', validators=[DataRequired()])
    comments = TextAreaField('')
    submit = SubmitField('записаться')



def file_list_form_builder(filenames):
    class FileListForm(OrderForm):
        pass

    for (i, filename) in enumerate(filenames):
        setattr(FileListForm, 'filename_%d' % i, BooleanField(filename))
    return FileListForm()



