const body = document.querySelector('.page__body');
const overlay = document.querySelector('#overlay');



function getScrollbarWidth () {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;
}

export function showOverlay () {
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    overlay.classList.add('overlay_active');
    body.classList.add('no-scroll');
}

export function hideOverlay () {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    overlay.classList.remove('overlay_active');
    body.classList.remove('no-scroll');
}