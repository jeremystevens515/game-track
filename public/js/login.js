const userNameInputEl = document.getElementById("username");
const passwordInputEl = document.getElementById("password");
const continueBtn = document.getElementById("continue");

const getUserInfo = (event) => {
	event.preventDefault();
	const data = {
		username: userNameInputEl.value,
		password: passwordInputEl.value,
	};
	console.log("data:", JSON.stringify(data));
	fetch("/user/login", {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" },
	}).then((res) => {
		if (res.ok) {
			document.location.replace("/");
		}
	});
};

continueBtn.addEventListener("click", getUserInfo);
