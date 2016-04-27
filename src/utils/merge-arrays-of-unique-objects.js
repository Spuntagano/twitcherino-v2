export default function(newList, oldList, firstKey, secondKey) {
	let list = oldList;

	newList.map((newObj) =>{
		let found = false;
		oldList.map((oldObj) => {
			if (newObj[firstKey][secondKey] === oldObj[firstKey][secondKey]){
		    	found = true;
		  	}
		});
		if (!found){
		  list.push(newObj);
		}
	});

	return list;
}