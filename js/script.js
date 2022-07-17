window.addEventListener('DOMContentLoaded', () => {
    const tabsParent = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    loader = document.querySelector('.loader')

    //loader
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none'
        }, 500);
    }, 2000);

    //TABS
function hideTabContent() {
    tabsContent.forEach((item) => {
        item.classList.add('hide')
        item.classList.remove('show', 'fade')
    })
    tabs.forEach((item) => {
        item.classList.remove('tabheader__item_active')
    })
}
function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade')
    tabsContent[i].classList.remove('hide')
    tabs[i].classList.add('tabheader__item_active')
}

hideTabContent()
showTabContent()

tabsParent.addEventListener('click', (evt) => {
    const target = evt.target
    if(target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if(target == item) {
                hideTabContent()
                showTabContent(i)
            }
        })
    }
});

//Timer
    const deadline = "2022-08-21";


    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds

        const timer = Date.parse(endtime) - Date.parse(new Date())

        if(timer <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(timer / (1000 * 60 * 60 * 24)),
            hours = Math.floor((timer / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((timer / (1000 * 60)) % 60),
            seconds = Math.floor((timer / 1000) % 60)
        }
        return{ timer, days, hours, minutes, seconds }
    }

    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setclock(selector, endtime) {
        const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector("#hours"),
        minutes = timer.querySelector("#minutes"),
        seconds = timer.querySelector("#seconds"),
        timeInterval = setInterval(updateClock, 1000)

        function updateClock() {
            const t = getTimeRemaining(endtime)

            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if(t.timer === 0) {
                clearInterval(timeInterval)
            }
        }
    }
    setclock('.timer', deadline)

    //Modal

    // const modalTrigger = document.querySelector('[data-modal]'),
    //     modal = document.querySelector('.modal'),
    //     modalClodeBtn = document.querySelector('[data-close]')

    // modalTrigger.addEventListener('click', () => {
    //     modal.classList.toggle('show')
    //     document.body.style.overflow = 'hidden'
    // })

    // function closeModal() {
    //     modal.classList.toggle('show')
    //     document.body.style.overflow = ''
    // }
    
    // modalClodeBtn.addEventListener('click', closeModal)

    // modal.addEventListener('click', (evt) => {
    //     if(evt.target == modal) {
    //        closeModal()
    //     }
    // })
    // document.addEventListener('keydown', (evt) => {
    //     if(evt.code === 'Escape' && modal.classList.contains('show')) {
    //         closeModal()
    //     }
    // })


    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClodeBtn = document.querySelector('[data-close]')

        function closeModal() {
            modal.classList.toggle('show')
            document.body.style.overflow = ''
        }

        function openModal() {
            modal.classList.toggle('show')
            document.body.style.overflow = 'hidden'
            clearInterval(modalTimerId)
        }

        modalTrigger.forEach((item) => {
            item.addEventListener('click', openModal)
        })

    // modalTrigger.addEventListener('click', () => {
    //     modal.classList.toggle('show')
    //     document.body.style.overflow = 'hidden'
    // })
    modalClodeBtn.addEventListener('click', closeModal)

    modal.addEventListener('click', (evt) => {
        if(evt.target == modal) {
            closeModal()
        }
    })

    const modalTimerId = setTimeout(openModal, 50000)

    function showModalByScroll() {
        if(
            window.pageYOffset + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight -1
        ) {
            // openModal()
            window.removeEventListener('scroll', showModalByScroll)
            closeModal()
        }
    }
    
    window.addEventListener('scroll', showModalByScroll)

    // class

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.classes = classes
            this.parent = document.querySelector(parentSelector)
            this.transfer = 11100
            this.changeToUzs()
        }

        changeToUzs() {
            this.price = this.price * this.transfer
        }

        render() {
            const element = document.createElement('div')

            if(this.classes.length === 0) {
                this.element = 'menu__item'
                element.classList.add(this.element)
            } {
                this.classes.forEach((classname) => element.classList.add(classname))
            }

            element.innerHTML = `
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Price:</div>
              <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
            </div>
            `

            this.parent.append(element)
        }
    }

 new MenuCard(
    'img/tabs/1.png',
    'vegy',
    'Plan "Usual"',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
    10,
    '.menu .container',
 ).render()
 new MenuCard(
    'img/tabs/2.jpg',
    'elite',
    'Plan “Premium”',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid molestiae, sit eveniet, tempora ipsum quaerat recusandae sapiente doloremque corporis dolores quas consectetur ut labore distinctio libero reiciendis harum sequi?',
    15,
    '.menu .container',
    'menu__item'
 ).render()
 new MenuCard(
    'img/tabs/3.jpg',
    'post',
    'Plan "VIP"',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus natus nobis minus corporis atque enim vitae, modi eligendi commodi itaque voluptatum ipsum. Nemo reiciendis, id rem dolorum rerum consequuntur eos.',
    20,
    '.menu .container',
    'menu__item'
 ).render()

// form

const forms = document.querySelectorAll('form')

forms.forEach((form) => {
    posData(form)
})

const msg = {
    loading: 'Loading...',
    success: "Thank's for submitting our form",
    failure: 'Something went wrong',
}

function posData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const statusMassage = document.createElement('div')
        statusMassage.textContent = msg.loading
        form.append(statusMassage)
    
        const request = new XMLHttpRequest()
        request.open('POST', 'server.php')

        request.setRequestHeader('Content-Type', 'application/json')

        const obj = {}
        const formData = new FormData(form)

        formData.forEach((val, key) => {
            obj[key] = val
        })

        const json = JSON.stringify(obj)

        request.send(json)

        request.addEventListener('load', () => {
            if(request.status === 200) {
                console.log(request.response);
                statusMassage.textContent = msg.success
                form.reset()
                setTimeout(() => {
                    statusMassage.remove()
                }, 2000);
            }else {
                statusMassage.textContent = msg.failure
            }
        })
}

)}

});
