$(document).ready(function(){
	// $("canvas").css("background-color", "green");
	$(".rating-1 canvas:nth-child(n+10)").css("background-color", "#999");
	$(".rating-2 canvas:nth-child(n+10)").css("background-color", "#999");
	$(".rating-3 canvas:nth-child(n+9)").css("background-color", "#999");
	$(".rating-4 canvas:nth-child(n+9)").css("background-color", "#999");
	$(".rating-5 canvas:nth-child(n+8)").css("background-color", "#999");
	$(".rating-6 canvas:nth-child(n+7)").css("background-color", "#999");
	$(".rating-7 canvas:nth-child(n+7)").css("background-color", "#999");
	$(".rating-8 canvas:nth-child(n+6)").css("background-color", "#999");
  
    // Añadir desplazamiento suave a todos los vínculos de la barra de navegación
  $(".navbar a").on('click', function(event) {
    // comportamiento predeterminado
    if (this.hash !== "") {
      // Evitar el comportamiento predeterminado del clic de anclaje
      event.preventDefault();

     
      var hash = this.hash;

      // Utiliza el método de animación () de jQuery para añadir desplazamiento de página suave
      // El número opcional (900) especifica el número de milisegundos que se tarda en desplazarse hasta el área especificada
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        
        window.location.hash = hash;
      });
    } // Final
  });
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });
})

//  funciones del protafolio de imagenes //


/*====================================
*     portafolio de NUESTROS SERVICIOS
======================================*/
// Enlaces de páginas
// data-link="foo" show data-section="foo"
var links = Array.prototype.slice.call(
   document.querySelectorAll('[data-link]')),
    sections = Array.prototype.slice.call(
  document.querySelectorAll('[data-section]'));
// menu vars
var menu = d('.menu').querySelector('ul'),
    menuBtn = d('.toggle_menu');

/*====================================
*    Carga de ventana
======================================*/
window.addEventListener('load',init,false);
/*====================================
*     Selector corto
======================================*/
function d(el){
  if(el) return document.querySelector(el);
}
/*====================================
*     Inicia la aplicación
======================================*/
function init(){
  // first time active home
  d('[data-section="home"]').classList.add('show-section');
  d('[data-link="home"]').classList.add('active');
  
  try{
    loader();
    navigation();
    lightModal();
    toggleSections();
  }catch(e){
    alert(e);
  }
}

/*====================================
*     Cambiar secciones
======================================*/
function toggleSections(){
  Array.prototype.forEach.call(links,function(o,i){
    o.addEventListener('click',function(e){
      var section = d('[data-section="'+this.getAttribute('data-link')+'"]');
      e.preventDefault();
      removeLinks(function(){
        o.classList.add('active');
        section.classList.add('show-section');
        menu.classList.toggle('show_menu');
        if(menu.classList.contains('show_menu')){
          menuBtn.innerHTML = '<i class="fa fa-close"></i>';
        }else{
          menuBtn.innerHTML = '<i class="fa fa-navicon"></i>';
        }
      });
    });
  });
}


/*===========================================
*     Elimina de clases activas y de sección de presentación
=============================================*/
function removeLinks(_success){
  Array.prototype.forEach.call(links,function(o,i){
    o.classList.remove('active');});
  Array.prototype.forEach.call(sections,function(o,i){
   o.classList.remove('show-section');
  });
  if(_success()) return _success();
}


/*====================================
*     Menú 
======================================*/
function navigation(){
  menuBtn.addEventListener('click',function(){
    menu.classList.toggle('show_menu');
    if(menu.classList.contains('show_menu')){
      menuBtn.innerHTML = '<i class="fa fa-close"></i>';
    }else{
      menuBtn.innerHTML = '<i class="fa fa-navicon"></i>';
    }
  });
}


/*====================================
*     Custom LightModal
======================================*/
function lightModal(){
  var links = document.querySelectorAll('.lightCustom'), 
  arrayOfLinks = Array.prototype.slice.call(links);
  Array.prototype.forEach.call(arrayOfLinks, function (obj, index) {
    obj.addEventListener('click', function (e) {
        e.preventDefault();
        var title = obj.title ? obj.title : '...';
        d('.lightModal').classList.add('show');
        d('.lightModal-title').innerHTML = title;
        d('.lightModal-image').src = obj.href;
        d('.lightModal-image').alt = title;
    });
    d('.lightModal-close').addEventListener('click', function (e) {
        e.preventDefault();
        d('.lightModal').classList.remove('show');
        d('.lightModal-title').innerHTML = '';
        d('.lightModal-image').src = '';
        d('.lightModal-image').alt = '';
    });
  });
}

/*====================================
*    Cargador
======================================*/
function loader(_success) {
  
    var obj = document.createElement('div');
    obj.className = 'preloader';
    
    var inner = document.createElement('div');
    inner.className = 'preloader_inner';
    
    d('.wrapper').appendChild(obj);
    obj.appendChild(inner);
    
    obj.classList.add('show');
    var w = 0,
        t = setInterval(function() {
            w = w + 1;
            inner.textContent = w+'%';
            if (w === 100){
                obj.classList.remove('show');
                clearInterval(t);
                w = 0;
                obj.remove();
                if (_success){
                    return _success();
                }
            }
        }, 20);
}

