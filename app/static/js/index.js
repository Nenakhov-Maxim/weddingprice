/* 
Блок работы навигации, меню слева
*/

//Контакты
let menu = document.querySelectorAll(".main-menu__menu-item")
for (const item in menu) {
  if (Object.hasOwnProperty.call(menu, item)) {
    const menu_item = menu[item];
    menu_item.addEventListener('click', function(e){
      e.preventDefault()      
      scrollToElement(e.path[1])
    })
  }
}
// Скроллинг до необходимого блока
 function scrollToElement(e) {    
   switch (e.id) {
     case 'main':
      close_menu();           
       element = document.querySelector(".header");
       element.scrollIntoView({
         behavior: 'smooth',
         block: 'start'});
       break;
     case 'photo-price':
      close_menu();          
       element = document.querySelector(".photo-price");
       element.scrollIntoView({
         behavior: 'smooth',
         block: 'start'});
       break;
     case 'video-price':
      close_menu();       
       element = document.querySelector(".video-price");
       element.scrollIntoView({
         behavior: 'smooth',
         block: 'start'});
       break;    
     case 'photo-video-price':
      close_menu();      
       element = document.querySelector(".photo-video-price");
       element.scrollIntoView({
        behavior: 'smooth',
         block: 'start'});
       break;
     case 'to-gallery':
      close_menu();      
       element = document.querySelector("#gallery");
       element.scrollIntoView({
         behavior: 'smooth',
         block: 'start'});
       break;
     case 'contact':
      close_menu();      
       element = document.querySelector(".contact");
       element.scrollIntoView({
         behavior: 'smooth',
         block: 'start'});
       break;     
     default:
       break;
   }
 }

 //Закрыть меню для экранов < 800px
 function close_menu(){
  if (document.querySelector('.main-menu').classList.contains('active_nav')) {
    document.querySelector('.main-menu').classList.remove('active_nav');
    document.querySelector('.main-menu__inner').style.display = 'none';
  }  
 };

 /*

 Подсветка активного пункта меню при скролле

 */
 jQuery(($) => {

  const section = $("section");
  const nav = $(".main-menu__menu-item");
  const navHeight = nav.outerHeight(); // получаем высоту навигации

  // поворот экрана
  window.addEventListener("orientationchange", () => {
      const navHeight = nav.outerHeight();
  }, false);
  
  $(window).on("scroll", () => {
      const position = $(this).scrollTop();    
      section.each(function () {
          const top = $(this).offset().top - navHeight - 5,
              bottom = top + $(this).outerHeight();
          if (position >= top && position <= bottom) {
              nav.find("a").removeClass("menu-active");
              section.removeClass("act");
              this_atr = $(this).attr('id');              
              $(this).addClass("act");
              nav.find(`a[href=#${this_atr}]`).addClass("menu-active");
          }
      });
  });
});

/* 

Блок, посвещенный работе с формой заказа услуги

*/

// Определение базовых переменных
// Кнопки на странице с текстом "заказать"
let order_btn = document.querySelectorAll('.package__content-order');
//Форма для заказа услуги
let order_form = document.querySelector('.order-form');
// Заголовок формы (нужен для автоматического написания типа пакета)
let form_title = document.querySelector('.form-title');
//Блок с базовыми услугами, входящих в пакет
let services = document.querySelector('.whatinclusive-list')
// Блок с дополнительными услугами
let additional_services_block = document.querySelector('.additional-services__list')
//Блок с перемещением исполнителя
let transporting_block = document.querySelector('.transporting');
// Заголовок для блок с разршением на публикацию
let permission_to_publish_title = document.querySelector('.permission-to-publish__title');
//  Заголовок для блока с перемещением
let transporting_title = document.querySelector('.transporting__title');
//Закрытие формы, нажатием на крестик
/*document.querySelector('.close-form').addEventListener('click', ()=>{
  order_form.classList.remove('active');
});*/

//Открытие формы по нажатию кнопки
//Обработка типа формы и типа пакета
/*for (const btn in order_btn) {
  if (Object.hasOwnProperty.call(order_btn, btn)) {
    const element = order_btn[btn];
    element.addEventListener('click', function(e){
      e.preventDefault();      
      let type_form = e.path[0].dataset.package.split(',')[0];
      let type_package = e.path[0].dataset.package.split(',')[1];
      //services.innerHTML = '';
      //additional_services_block.innerHTML = '';
      //Проверка на активный класс 'disable' в блоке перемещения, если есть - отключаем.
      if (transporting_block.classList.contains('disable')) {
        transporting_block.classList.remove('disable');          
      };
      // Для каждого вида услуги открывается форма со своим содержимым
      // Подробнее в каждой функции
      if  (type_form == 'photo'){
        *//*form_photo(type_package);*//*
      } else if (type_form == 'video') {
        form_video(type_package);
      } else if (type_form == 'video-photo') {
        form_photo_video(type_package);
      };
      order_form.classList.add('active');
    })    
  }
}*/

//type - тип пакета (mini, standart, full-day)
//Данные для формы "фото"
// function form_photo(type) {
//   //Забираем и добавляем в форму базовые услуги для каждого пакета фотографа
//   let list_li = photo_package(type);   
//   form_title.innerHTML = `Вы выбрали фотосъемку, пакет "${type}" `;
//   for (const key in list_li) {
//     if (Object.hasOwnProperty.call(list_li, key)) {
//       const li = list_li[key];
//       services.append(li);
//     };
//   };
//   //Дополнительные услуги для фото
//   let additional_list_li = ['1',
//                             '2',
//                             '3'];
//   for (let i = 0; i < additional_list_li.length; i++) {
//     const additional_services = additional_list_li[i];
//     let additional_li = document.createElement('li');
//     additional_li.classList.add('additional-services__list-item');
//     additional_li.innerHTML = `
//     <input type="checkbox" name="additional-services">
//     <label for="additional-services">${additional_services}</label>`;
//     additional_services_block.append(additional_li);
//   };
//   // Изменение заголовка для блока с перемещением
//   transporting_title.innerHTML = 'На чем перемещается фотограф с места на место?';
//   //Изменение заголовока для блока с разрешением на публикацию
//   permission_to_publish_title.innerHTML = 'Разрешение на публикацию фотографий в сети Интернет'; 
// };

// //Данные для формы "видео"
// function form_video(type) {    
//   form_title.innerHTML = `Вы выбрали видеосъемку, пакет "${type}" `;
//   //Забираем и добавляем в форму базовые услуги для каждого пакета видеографа
//   let list_li = video_package(type);  
//   for (const key in list_li) {
//     if (Object.hasOwnProperty.call(list_li, key)) {
//       const li = list_li[key];
//       services.append(li);
//     };
//   };
//   //Дополнительные услуги для видео
//   let additional_list_li = ['Дополнительный час видеосъёмки к пакету',
//                             'Съёмка после 24,00 (за час)',
//                             'Предсвадебный клип «Love Story»',
//                             'SDE-ролик – монтаж клипа в день свадьбы и показ на банкете (оговаривается отдельно)',
//                             'Свадебный клип продолжительностью 1-2 минуты',
//                             'Весь исходный материал без монтажа на жесткий диск заказчика'];
//   for (let i = 0; i < additional_list_li.length; i++) {
//     const additional_services = additional_list_li[i];
//     let additional_li = document.createElement('li');
//     additional_li.classList.add('additional-services__list-item');
//     additional_li.innerHTML = `
//     <input type="checkbox" name="additional-services">
//     <label for="additional-services">${additional_services}</label>`;
//     additional_services_block.append(additional_li);
//   };
//   //Убрать выбор перемещения для видеографа
//   transporting_block.classList.add('disable');
//   //Изменение заголовока для блока с разрешением на публикацию
//   permission_to_publish_title.innerHTML = 'Разрешение на публикацию видеоклипа в сети Интернет';
  
// };

// //Данные для формы фото + видео
// function form_photo_video(type) {   
//   form_title.innerHTML = `Вы выбрали фото и видео, пакет "${type}" `;
//   let list_li = photo_video_package(type);
//   for (const key in list_li) {
//     if (Object.hasOwnProperty.call(list_li, key)) {
//       const li = list_li[key];
//       services.append(li);
//     };
//   };
//   //Дополнительные услуги для фото и видео
//   let additional_list_li = ['Дополнительный час фотосъемки к пакету',
//                             'Съёмка после 24,00 (за час)',
//                             'Предсвадебная фотосессия «Love Story»',
//                             'Дополнительный час видеосъёмки к пакету',                            
//                             'Предсвадебный клип «Love Story»',
//                             'SDE-ролик – монтаж клипа в день свадьбы и показ на банкете (оговаривается отдельно)',
//                             'Свадебный клип продолжительностью 1-2 минуты',
//                             'Весь исходный материал без монтажа на жесткий диск заказчика'];
//   for (let i = 0; i < additional_list_li.length; i++) {
//     const additional_services = additional_list_li[i];
//     let additional_li = document.createElement('li');
//     additional_li.classList.add('additional-services__list-item');
//     additional_li.innerHTML = `
//     <input type="checkbox" name="additional-services">
//     <label for="additional-services">${additional_services}</label>`;
//     additional_services_block.append(additional_li);
//   };
//   // Изменение заголовка для блока с перемещением
//   transporting_title.innerHTML = 'На чем перемещаются фотограф и видеограф с места на место?';
//   //Изменение заголовока для блока с разрешением на публикацию
//   permission_to_publish_title.innerHTML = 'Разрешение на публикацию фотографий и видеоклипа в сети Интернет';
// }

// //Разделения по включениям услуг в пакеты
// //Фото пакет
// function photo_package(type){
//   let result_li = [];
//   let united_list_services = [];
//   let base_list_services = [
//     'Предсвадебная консультация. Помощь в планировании свадебного дня;',
//     'Составление тайминга дня, составление маршрута прогулки (при необходимости);',
//     'Цветокоррекция всех фотографий;',
//     'Ретушь всех крупных портретов молодожёнов;',
//     'Анонс фотографий в сети Интернет: 5-10 обработанных фотографий в течение 2 дней после свадьбы;',
//     'Предоставление фотостудии для съемки;'
//   ];
//   if (type == 'mini') {
//     let mini_list_services = [
//       'До 4 часов работы фотографа;',
//       'Материал предоставляется через ссылку на Яндекс.Диск;',
//       'Срок предоставления результатов работы - 1 неделя.'
//     ];
//     united_list_services = base_list_services.concat(mini_list_services)  
//   } else if (type == 'standart') {
//     let mini_list_services = [
//       'До 7 часов работы фотографа;',
//       'Срок предоставления результатов работы от 2 до 3 недель.'      
//     ];
//     united_list_services = base_list_services.concat(mini_list_services);    
//   } else if (type == 'full-day') {
//     let mini_list_services = [
//       'Съемка целого дня свадьбы, но не позднее 24.00;',
//       'Срок предоставления результатов работы от 2 до 4 недель.'
//     ];
//     united_list_services = base_list_services.concat(mini_list_services);    
//   }
//   for (let i = 0; i < united_list_services.length; i++) {
//     const element = united_list_services[i];    
//     let li = document.createElement('li');
//     li.classList.add('whatinclusive-item');
//     li.innerHTML = element;
//     result_li.push(li);
//   }
  
//   return result_li;  
// }

// //Видео пакет
// function video_package(type){
//   let result_li = [];
//   let united_list_services = [];
//   let base_list_services = [
//     'Предсвадебная консультация. Помощь в планировании свадебного дня;',
//     'Монтаж;',
//     'Цветокоррекция;',
//     'Запись качественного звука с микрофона ведущего во время  банкета и выездной регистрации (при возможности диджея);'    
//   ];
//   if (type == 'mini') {
//     let mini_list_services = [
//       'До 4 часов работы видеографа;',
//       'Фильм продолжительностью 5-10 минут;',
//       'Срок предоставления результатов работы от 1 до 2 недель.'
//     ];
//     united_list_services = base_list_services.concat(mini_list_services)  
//   } else if (type == 'standart') {
//     let mini_list_services = [
//       'До 7 часов работы видеографа;',
//       'Авторский фильм продолжительностью 15-20 минут;',
//       'Срок предоставления результатов работы от 2 до 3 недель.'      
//     ];
//     united_list_services = base_list_services.concat(mini_list_services);    
//   } else if (type == 'full-day') {
//     let mini_list_services = [
//       'Съемка целого дня свадьбы, но не позднее 24.00;',
//       'Авторский фильм продолжительностью 25-40 минут;',
//       'Садебный ролик продолжительностью 1-2 минуты;',
//       'Срок предоставления результатов работы от 3 до 4 недель.'
//     ];
//     united_list_services = base_list_services.concat(mini_list_services);    
//   }
//   for (let i = 0; i < united_list_services.length; i++) {
//     const element = united_list_services[i];    
//     let li = document.createElement('li');
//     li.classList.add('whatinclusive-item');
//     li.innerHTML = element;
//     result_li.push(li);
//   }
  
//   return result_li;  
// }

// //Видео + фото пакет
// function photo_video_package(type){
//   let result_li = [];
//   let united_list_services = [];
//   let base_list_services = [
//     'Предсвадебная консультация. Помощь в планировании свадебного дня;',
//     'Составление тайминга дня, составление маршрута прогулки (при необходимости);',
//     'Запись качественного звука с микрофона ведущего во время  банкета и выездной регистрации (при возможности диджея);',
//     'Монтаж видео;',
//     'Цветокоррекция  видео и фотографий;',
//     'Ретушь всех крупных портретов молодожёнов на фото;',
//     'Анонс фотографий в сети Интернет: 5-10 обработанных фотографий в течение 2 дней после свадьбы;',
//     'Предоставление фотостудии для съемки (в подарок);'    
//   ];
//   if (type == 'mini') {
//     let mini_list_services = [
//       'До 4 часов работы фотографа и видеографа;',
//       'Фильм продолжительностью 5-10 минут;',
//       'Срок предоставления результатов работы от 1 до 2 недель.'
//     ];
//     united_list_services = base_list_services.concat(mini_list_services)  
//   } else if (type == 'standart') {
//     let mini_list_services = [
//       'До 7 часов работы фотографа и видеографа;',
//       'Авторский фильм продолжительностью 15-20 минут;',
//       'Срок предоставления результатов работы от 2 до 3 недель.'      
//     ];
//     united_list_services = base_list_services.concat(mini_list_services);    
//   } else if (type == 'full-day') {
//     let mini_list_services = [
//       'Съемка целого дня свадьбы, но не позднее 24.00;',
//       'Авторский фильм продолжительностью 25-40 минут;',
//       'Садебный ролик продолжительностью 1-2 минуты;',
//       'Срок предоставления результатов работы от 2 до 4 недель.'
//     ];
//     united_list_services = base_list_services.concat(mini_list_services);    
//   }
//   for (let i = 0; i < united_list_services.length; i++) {
//     const element = united_list_services[i];    
//     let li = document.createElement('li');
//     li.classList.add('whatinclusive-item');
//     li.innerHTML = element;
//     result_li.push(li);
//   }
  
//   return result_li;  
// }



// //Обработка формы
// order_form.addEventListener('submit', (e)=>{
//   e.preventDefault();
//   let form = document.querySelector('form'); 
//   for (const value in form) {
//     if (Object.hasOwnProperty.call(form, value)) {
//       const element = form[value];
//       console.log(element.value)      
//     }
//   }
// });

//Работа меню на экране меньше 800х600
let menu_mini = document.querySelector('.title-wrapper');
menu_mini.addEventListener('click', ()=> {  
  document.querySelector('.main-menu').classList.toggle('active_nav');
  if (document.querySelector('.main-menu').classList.contains('active_nav')) {
    document.querySelector('.main-menu__inner').style.display = 'flex';    
  } else {
    document.querySelector('.main-menu__inner').style.display = 'none';    
  }; 
  
});

//изменения сайта при изменении экрана

window.addEventListener('resize', ()=>{ 
  if(window.screen.width >= 800){
    document.querySelector('.main-menu__inner').style.display = 'flex';
  } else {
    document.querySelector('.main-menu__inner').style.display = null;
    
  };
});

//Открытие модального окна

$(document).ready(function () {
    $('.edit-modal-opener').click(function () {
        var url = $(this).data('whatever');
        $.get(url, function (data) {
            $('#Modal .order-form__container').html(data);
            $('#Modal').addClass('active');
            $('.close-form').click(function () {
                $('#Modal').removeClass('active');
                location.reload();
            });
        $('.form-button').click(function (event) {
                event.preventDefault();
                $.post(url, data = $('.order-form__value').serialize(), function (
                    data) {
                    console.log(data)
                    var f_inp = $('.form-input');
                    console.log(f_inp)
                    console.log(f_inp.length)
                    for (let i = 0; i < f_inp.length; i++) {
                      f_inp[i].classList.remove('has-error');
                    }
                    if (data.status == 'ok') {
                        $('#Modal').removeClass('active');
                        location.reload();
                    } else {
                        $('.help-block').remove();
                        var obj = JSON.parse(data);
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                var value = obj[key];
                            }

                            $('<p class="help-block">' + value + '</p>')
                            .insertBefore('#' + key);
                            $('#' + key).addClass('has-error')
                        }
                    }
                })
            });
        })

    });
});