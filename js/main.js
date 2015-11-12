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

	if(localStorage.getItem("JGID") !== null){
		return localStorage.getItem("JGID");
	}

	var numArray = createRandomArray(8,1,9);
	var id = hashids.encode(numArray);

    localStorage.setItem("JGID", id);
	return id;
}

var JGID = getJGID();

$("#Identify").click(function() {
	analytics.identify(JGID, {
	  email: $("#exampleInputEmail1").val()
	});
	console.log(JGID);
});

$("#exampleInputEmail2").blur(function() {
	analytics.track('Blur email field', {
	  typed: $(this).val()
	});
});

$("#checkbox").click(function() {
	analytics.track('Magic checkbox', {
	  typed: $(this).prop("checked")
	});
});

analytics.page({
	"server": "1.1.1.1"
});

var form = document.getElementById('testform');

analytics.trackForm(form, 'test_form', {
  textbox: $("#exampleInputEmail3").val(),
  checkbox: $("#checkbox2").prop("checked")
});

analytics.ready(function(){
	analytics.user().anonymousId(JGID);
	analytics.debug();
});

