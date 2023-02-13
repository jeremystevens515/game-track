const userNameInputEl = document.getElementById("username");
const passwordInputEl = document.getElementById("password");

getUserInfo = () => {
	userName = userNameInputEl.value;
	userPassword = passwordInputEl.value;
	console.log(userName);
	console.log(userPassword);
};

console.log("hello world");
