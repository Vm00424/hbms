/**
 * 
 */

function calculateAmount(rate){
	var from = document.getElementById("fromDate").value;
	var to = document.getElementById("toDate").value;
	var result = false;

	var currDate = new Date();
	var date1 = new Date(from);
	var date2 = new Date(to);
	
	if(from == "" || to == ""){
		alert("please select check in and check out date..");
	}else if(from > to){
		alert("Check in date should be earlier date then check out date");
	}else if(currDate > from){
		alert("Check in date should be a future date")
	}

	
	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

	var amount = (diffDays+1)*rate;
	if(diffDays > 4){
		alert("you can't book a room for more then 4 days.");
	}
	
	if(amount > 0 && diffDays < 5){
		document.getElementById("amount").value = amount;
		result = true;
	}
	return result;
}

////////////////////////////////	Validate Login		//////////////////////////////////////////////////////////////////

function validateLogin(){
	var userName = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	result = false;

	var userPattern = userName.match("[a-zA-Z]{5,20}");
	
	if(userName == "" || password == "" ){
		alert("UserName and Password can't be empty");
	}
	else if( userName.length<5 || userName.length>20  || password.length<5 || password.length>7 || !userPattern){
		alert("Username should be only alphabet 5 to 20 character long and password should be 5 to 7 character")
	}
	else{
		result = true;
	}
	return result;
}

///////////////////////////////		Validate Hotel Details	//////////////////////////////////////////////////////////////

function validateAddHotel(){
	var city = document.getElementById("city").value;
	var hotelName = document.getElementById("hotelName").value;
	var address = document.getElementById("address").value;
	var description = document.getElementById("description").value;
	var avgRatePerNight = document.getElementById("avgRatePerNight").value;
	var phoneNoOne = document.getElementById("phoneNoOne").value;
	var phoneNoTwo = document.getElementById("phoneNoTwo").value;
	var rating = document.getElementById("rating").value;
	var email = document.getElementById("email").value;
	var fax = document.getElementById("fax").value;

	var errorMessage = "";
	var emailPattern = email.match(/@/g);
	
	var result = false;
	
	if(hotelName.length<3 || hotelName.length>20){
		errorMessage="Hotel Name can't be empty and can have maximum of twenty characters";
	}
	else if( city.length<3 || city.length>10){
		errorMessage="City can't be empty and can have maximum of ten characters";
	}
	else if(address.length<5 || address.length>25){
		errorMessage="Address can't be empty and can have maximum of twenty five characters";
	}
	else if(description.length<5 || description.length>50){
		errorMessage="description can't be empty and can have maximum of fifty characters \n";
	}
	else if(avgRatePerNight<400 || avgRatePerNight>9999.99 ){
		errorMessage="Avg Rate can't be empty and Per Night can be maximum 10000 \n";
	}
	else if(phoneNoOne.length != 10){
		errorMessage="Enter a valid 10 digit phone No \n";
	}
	else if(phoneNoTwo.length != 10){
		errorMessage="Enter a valid 10 digit phone No  \n";
	}
	else if(rating.length!=1 || rating>5 || rating<1){
		errorMessage="Rating can't be empty and should be between 1 and 5 \n";
	}
	else if(email.length<7 || email.length>15 || !emailPattern){
		errorMessage="Enter valid Email (maximum length is 15 characters, minimum 7)";
	}
	else if(fax.length<10 || fax.length>15){
		errorMessage="Enter valid fax (maximum length is 15 characters, minimum 10)";
	}
	else{
		result = true;
	}
	
	if(errorMessage){
		alert(errorMessage);
	}
	return result; 
}

//////////////////////////////	Validate Register	/////////////////////////////////////////////////////////////////////

function validateRegister(){
	var userName = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var role=document.getElementById("role").value;
	var mobileNumber=document.getElementById("mobile").value;
	var phoneNumber=document.getElementById("phone").value;
	var address=document.getElementById("address").value;
	var email=document.getElementById("email").value;

	var errorMessage="";
	var emailP=email.match(/@/g);
	
	var result1 = false;
	var result2 = false;

	
	
	if(email.length<1 || email.length>15 || !emailP){
		errorMessage="Enter valid Email (maximum length is 15 characters) \n";
	}

	else if(mobileNumber.length != 10){
		errorMessage="Enter a valid 10 digit mobile No \n";
	}
	else if(phoneNumber.length != 10){
		errorMessage="Enter a valid 10 digit phone No  \n";
	}
	else if(address.length<1 || address.length>25){
		errorMessage="Address can have maximum of twenty five characters \n";
	}
	else if(!(role=="user" || role=="admin" || role=="employee") ){
		errorMessage="Role should be either user or admin or employee";
	}
	else{
		result1 = true;
	}
	
	result2 = validateLogin();
	
	if(errorMessage){
		alert(errorMessage);
	}
	return (result1 && result2);

}

/////////////////////////////	validate Book Room	/////////////////////////////////////////////////////////////////////

function validateBookRoom(rate){

	var result1 = calculateAmount(rate);
	var result2 = false;


	var noOfAdults= document.getElementById("noOfAdults").value;
	var noOfChildren= document.getElementById("noOfChildren").value;

	var total = 1*noOfChildren + 1*noOfAdults ;

	var errorMessage="";
	
	if( total >4 || noOfChildren>2 || noOfAdults < 1){
		errorMessage="There must be a adult and a maximum of 4 people. Maximum of two children are allowed, Totel: "+total;
	}else{
		result2 = true;
	}


	if(errorMessage){
		alert(errorMessage);
	}
	return (result1 && result2);
	
}

/////////////////////////////	validate Room detials	/////////////////////////////////////////////////////////////////

function validateAddRoom(){
	var roomNo = document.getElementById("roomNo").value;
	var roomType = document.getElementById("roomType").value;
	var perNightRate = document.getElementById("perNightRate").value;
	var availability = document.getElementById("availability").value;
	var photo = document.getElementById("photo").value;
	var result = false;
	var checkimg = photo.toLowerCase();
	
	if(roomNo == "" || roomType == "" || perNightRate == "" || availability == "" || photo == ""){
		alert("No field should be empty");
	}else{
		if(roomNo.length !=3){
			alert("Room No: Enter 3 digit number");
		}
		else if(perNightRate > 9999 || perNightRate < 500){
				alert("Per Night Rate: Enter correct rate");
		}
		else if (!checkimg.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/)){
			document.getElementById("photo").focus();
			alert("Wrong file selected");
		}
		else if(photo.files[0].size <  1048576)
		{
			alert("Image size too short");
		}
		else{
			result = true;
		}
	}
	
	return result;
}

