import CONSTS from './consts';
import _ from 'underscore';

export function onScroll(func){
	window.onscroll = _.debounce(function() {
	    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - CONSTS.SCROLL_LOAD_OFFSET) {
	        func();
	    }
	}, CONSTS.DEBONCE_TIMER);
}

export function removeOnScroll(){
	window.onscroll = null;
}