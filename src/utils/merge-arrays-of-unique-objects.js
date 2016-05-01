export default function(newList, oldList, key) {
	let list = oldList;

	newList.map((newObj) =>{
		let found = false;
		oldList.map((oldObj) => {
			if (newObj[key] === oldObj[key]){
		    	found = true;
		  	}
		});
		if (!found){
		  list.push(newObj);
		}
	});

	return list;
}