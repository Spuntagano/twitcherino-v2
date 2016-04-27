import ellipsis from 'ellipsis-overflow';

export default function(el){
	el.style.overflowY = 'scroll';
	ellipsis(el);
	el.style.overflowY = 'hidden';
}