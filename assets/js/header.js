const classLinkMobile = '.js-link-mobile';

export function menuMobile() {
    const link = document.querySelector(classLinkMobile);
    const ul = link.parentNode.querySelector('ul');
    link.addEventListener('click', function (e) {
        e.preventDefault();
        ul.classList.add('active');
        
        const div = document.createElement('div');
        div.classList.add('overlay');
        div.addEventListener('click', onClickOverlay);
        link.parentNode.appendChild(div);
    });
}

/**
 * @param {MouseEvent} e 
 */
const onClickOverlay = function (e) {
    document.querySelector('.navigation ul').classList.remove('active');
    this.removeEventListener('click', onClickOverlay);
    this.parentNode.removeChild(this);
}