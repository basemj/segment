var hashids = new Hashids("justgiving the data", 2, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

function randomNumber(min,max) {
    return (Math.round((max-min) * Math.random() + min));
}

function createRandomArray(numElements,min,max) {

    var nums = new Array;

    for (var element=0; element<numElements; element++) {
        nums[element] = randomNumber(min,max);
    }

    return (nums);
}

function getJGID() {
	if(typeof(Storage) === "undefined") {
	    return null;
	}

	if(localStorage.getItem("JGID") === null){
		return localStorage.getItem("JGID");
	}

	var numArray = createRandomArray(5,1,9);
	var id = hashids.encode(numArray);

    localStorage.setItem("JGID", id);
	return id;
}

$("#Identify").click(function() {
	var JGID = getJGID();
	analytics.identify(JGID, {
	  email: $("#exampleInputEmail1").val()
	});
	console.log(JGID);
});
