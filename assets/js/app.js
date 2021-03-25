import {menuMobile} from './header'
import {createVideo} from './videos'
const turbolinks = require('turbolinks')

/**
 * 
 * @param {string} selector 
 * @param {Object} options 
 * @param {CallableFunction} callback Fonction à appellé quand l’element rentre dans le dom
 * 
 * @property {NodeList} elements
 * @property {Object} options
 * @property {number} options.frequence
 * @property {number} options.decalageVertical
 * 
 * @property {number} timerEvenement
 * @property {number} windowHeight
 * @property {number} decalageVerticalEnPixels
 */
function ScrollEnter(selector, callback, options) {
    this.deleteElement = function (el) {
        let index = this.elements.indexOf(el);
        if (index > -1) {
            this.elements.splice(index, 1);
        }
    }
    this.elementsLoad = function (){		
        let el, rect, approche, elSup = [];
	    for(let i = 0, nbEls = this.elements.length; i < nbEls; i++){
            el = this.elements[i]
            rect = el.getBoundingClientRect();
            approche = rect.top <= (this.windowHeight - this.decalageVerticalEnPixels) && rect.bottom >= 0

            if(approche){ 
                console.log(el)
                callback(el); 
                // this.elements.splice(i, 1)
                elSup.push(el);
                // delete this.elements[i]
                console.log(this.elements)
            }
        }
        for (let i = 0, nb = elSup.length; i < nb; i++) {
            this.deleteElement(elSup[i])
        }
    }
    this.onScroll = function () {
		if(this.frequence > 0) {
			if(this.timerEvenement) {
		        window.clearTimeout(this.timerEvenement);
		    }
		    this.timerEvenement = window.setTimeout(this.elementsLoad.bind(this), this.frequence);
		} else {
			this.elementsLoad();
		}
    }
    this.onResize = function () {
        this.windowHeight = window.innerHeight;
        this.decalageVerticalEnPixels = this.windowHeight * (this.options.decalageVertical / 100);
        this.elementsLoad();
    }
    this.init = function () {
        this.options = Object.assign({}, {
            frequence: 64,
            decalageVertical: 5,
        }, options);

        this.windowHeight = window.innerHeight;
        this.decalageVerticalEnPixels = this.windowHeight * (this.options.decalageVertical / 100);
        this.elements = [].slice.call(document.querySelectorAll(selector));
        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
        this.elementsLoad();
    }

    this.init();
}

document.addEventListener('DOMContentLoaded', function () {
    menuMobile();
    
    const skillsPictures = document.querySelectorAll('.skills picture')
    if (skillsPictures) {
        let picture = null
        for (let i = 0, skillsPicturesLength = skillsPictures.length; i < skillsPicturesLength; i++) {
            picture = skillsPictures[i]
            const box = document.createElement('span')
            const top = document.createElement('span')
            const right = document.createElement('span')
            const bottom = document.createElement('span')
            const left = document.createElement('span')
            box.classList.add('box')
            top.classList.add('top')
            bottom.classList.add('bottom')
            right.classList.add('right')
            left.classList.add('left')

            box.appendChild(top)
            box.appendChild(bottom)
            box.appendChild(left)
            box.appendChild(right)

            picture.appendChild(box)
        }
    }
    // Image de fond header
    const header = document.querySelector('body > header')
    if (header.dataset.background !== undefined) {
        header.style.background = "url('../images/wave.svg') bottom no-repeat, radial-gradient(closest-side at 50% 50%, #151515F2 0%, #000000F7 100%) 50%, url('" + header.dataset.background + "') center / cover"
    }

    new ScrollEnter('picture', function (el) {
        console.log(el)
        el.classList.add('active');
        el.parentNode.classList.add('active');
        
        const src = el.dataset.src;
        const ext = el.dataset.ext;
    
        if (!src || !ext) { console.log('src non definie'); return; }
        const img = el.querySelector('img');
        const sources = el.querySelectorAll('source')
        img.setAttribute('src', src + '-' + img.dataset.taille + '.' + ext);
        let source, taille;

        if (sources.length) {
            for (let i = 0, nbEl = sources.length; i < nbEl; i++) {
                source = sources[i];
                taille = source.dataset.taille;
                if (!taille || taille.length === 0 ) {
                    source.setAttribute('srcset', src + '.' + ext);
                } else {
                    source.setAttribute('srcset',  src + '-' + taille + '.' + ext)
                }
                
                sources[i]
            }
        }


        console.log('Element entré : ', el, src, ext, img)
    })

    const videos = document.querySelectorAll('img.video')
    if (videos.length > 0) {
        new ScrollEnter('img.video', function (el) {
            console.log(el)
            el.classList.add('active')
            el.parentNode.classList.add('active')
            const src = el.dataset.src
            el.parentNode.appendChild(createVideo(src, el.classList))
            el.parentNode.removeChild(el)


        })
    }
})