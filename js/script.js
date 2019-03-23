window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent'),
        hideTabContent = a => {
            for (let i = a; i < tabContent.length; i++) {
                tabContent[i].classList.remove('show');
                tabContent[i].classList.add('hide');
            }       
        },
        showTabContent = b => {
            if (tabContent[b].classList.contains('hide')) {
                tabContent[b].classList.remove('hide');
                tabContent[b].classList.add('show');
            }
        };
        hideTabContent(1);
    
    info.addEventListener('click', e => {
        let target = e.target; 
        
        if(target.classList.contains('info-header-tab')){
            tab.forEach((item,i) => {
                if (target == item) {
                    hideTabContent(0);
                    showTabContent(i);
                }
            });
        }
    });

    // Timer
    let deadline = "2019-03-22",
        fix2 = n => {
            return (n < 10) ? '0' + n : n;
        },
        getTimeRemaning = endTime => {
            let t = Date.parse(endTime) - Date.parse(new Date()),
                sec = Math.floor((t / 1000) % 60),
                min = Math.floor((t / 1000 / 60) % 60),
                hour = Math.floor((t / (1000 * 60 * 60)));
            return (t > 0) ? { 'tital': t, 'sec': fix2(sec), 'min': fix2(min), 'hour': fix2(hour) } : { 'tital': t, 'sec': '00', 'min': '00', 'hour': '00' };
        },
        setClock = (id, endTime) => {
            let timer = document.getElementById(id),
                hour = timer.querySelector('.hours'),
                min = timer.querySelector('.minutes'),
                second = timer.querySelector('.seconds'),
                updateClock = () => {
                    let t = getTimeRemaning(endTime);
                    hour.textContent = t.hour;
                    min.textContent = t.min;
                    second.textContent = t.sec;
                    (t.total <= 0) ? clearInterval(timeInterval) : '';
                };
            let timeInterval = setInterval(updateClock, 1000);
        };
    setClock('timer', deadline);
    
    // Modal
    let overlay = document.querySelector('.overlay'),
        bindModal = ( btn, overlayStatus, overflowStatus) => {
            overlay.style.display = overlayStatus;
            btn.classList.add('more-splash')
            document.body.style.overflow = overflowStatus; 
            setTimeout(() => {
                btn.classList.remove('more-splash');
            }, 1500);
        };
        document.body.addEventListener('click', e => {
            let target = e.target;

            (target.classList.contains('more')) ? bindModal(target, 'block', 'hidden') : '';
            (target.classList.contains('description-btn')) ? bindModal(target, 'block', 'hidden') : '';
            (target.classList.contains('popup-close')) ? bindModal(target, 'none', '') : '';
        });
    
    //Form - переделаю на выходных
    let message = {
        loading: 'Загрузка ...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошо не так',
    },
        form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input')[0],       
        statusMessage = document.createElement('div'),
        formContact = document.getElementById('form'),
        inputContact = formContact.querySelectorAll('#form > input');
        
        statusMessage.classList.add('status');

        let sendForm = (form, input) => {
            
            form.appendChild(statusMessage);
            
            let request = new XMLHttpRequest();
            
            request.open('POST', 'server.php');       
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    
            let formData = new FormData(form),
                obj = {};
            
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            
            let json = JSON.stringify(obj);
                
            request.send(json);
            
            request.addEventListener('readystatechange', () => {
               (request.readyState < 4 ) ? statusMessage.innerHTML = message.loading : (request.readyState === 4 && request.status == 200) ? statusMessage.innerHTML = message.success : statusMessage.innerHTML = message.failure;
            });
    
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        };
    
    document.body.addEventListener('submit', e => {
        e.preventDefault();
        let target = event.target;
        
        (target == form) ? sendForm(form, input) : '';
        (target == formContact) ? sendForm(formContact, inputContact) : '';
    }); 

    // function chek() {
    //     if (input.value == '') {
    //     //console.log(input);
    //     console.log(input.value);
    //     }
        
    // }
    
    // chek();

    //slaider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

        showSlides(slideIndex);

        function showSlides(n) {

            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }

            slides.forEach((item) => item.style.display = 'none');
            dots.forEach((item) => item.classList.remove('dot-active'));
            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].classList.add('dot-active');
           
        }

        function plusSlides(n) {
            showSlides(slideIndex += n);            
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        prev.addEventListener('click', function() {
            plusSlides(-1);
        });
        next.addEventListener('click', function() {
            plusSlides(1);
        });

        dotsWrap.addEventListener('click', function(event) {
            for (let i=0;i<dots.length+1;i++) {
                if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                    currentSlide(i);
                }
            }
        });
    
    // calc

   
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        
            


        persons.addEventListener('change', function() {
            persons.value = persons.value.replace(/[^0-9]+/g, '');
            personsSum = +this.value;
            total = (daysSum + personsSum)*4000;
           
            if (restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;

            } else {
                totalValue.innerHTML = total;
            }

            

        });

        

       

        restDays.addEventListener('change', function() {
            restDays.value = restDays.value.replace(/[^0-9]+/g, '');
            daysSum = +this.value;
            total = (daysSum + personsSum)*4000;
     
            if (persons.value == '' || restDays.value == '' || persons.value == '0' || restDays.value == '0')  {
                totalValue.innerHTML = 0;

            } else {
                
                totalValue.innerHTML = total;
            } 
   
        });

        place.addEventListener('change', function() {
            if (restDays.value == '' || persons.value == ''|| persons.value == '0' || restDays.value == '0') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });


        


    

    

    
    
});
