/* 
Блок работы навигации, меню слева
*/

//Контакты
let menu = document.querySelectorAll(".main-menu__menu-item")
for (const item in menu) {
  if (Object.hasOwnProperty.call(menu, item)) {
    const menu_item = menu[item];
    menu_item.addEventListener('click', function(e){
      event.preventDefault();
      to_elem = e
      if(navigator.userAgent.includes("Mac")){
          
          scrollToElement(e.toElement.parentElement)
      } else {
          scrollToElement(e.path[1])
      }
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

//Открытие и работа модального окна

$(document).ready(function (e) {
    $('.edit-modal-opener').click(function () {
        
        var url = $(this).data('whatever');
        $.get(url, function (data) {
          $('#Modal .order-form__container').html('');
            $('#Modal .order-form__container').html(data);
            $('#Modal').addClass('active');
            $('.close-form').click(function () {
                $('#Modal').removeClass('active');
                
            });
        $('.form-button').click(function (event) {
                event.preventDefault();
                $.post(url, data = $('.order-form__value').serialize())
                  .done(function (data) {                 
                    var f_inp = $('.form-input');                 
                    for (let i = 0; i < f_inp.length; i++) {
                      f_inp[i].classList.remove('has-error');
                    }
                    if (data.status == 'ok') {
                        console.log(data.mail)
                        $('#Modal').removeClass('active').delay( 3800 );
                        location.reload();
                    } else {
                        
                        var obj = JSON.parse(data);
                        console.log(obj)
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
                  .fail(function(xhr, status, error) {
                    console.log(xhr, status, error)
                });

            });
        })

    });
});

$('.package__content-order').click(function(event){
  event.preventDefault()
})
// Скрытие меню при клике в другую область на небольших экранах

$(document).on('mousedown touchstart', function (e) {
    if(window.screen.width < 800){
        
        var container = $(".active_nav");
        if (container.has(e.target).length === 0){
            document.querySelector('.main-menu__inner').style.display = 'none';
            document.querySelector('.main-menu').classList.remove('active_nav');
        }
    }
});
