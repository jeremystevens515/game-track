console.log("JavaScript connected");

// if logout button exists
if (document.getElementById("logout")) {
	const logoutEl = document.getElementById("logout");

	const userLogout = () => {
		fetch("/user/logout", {
			method: "POST",
		}).then((res) => {
			if (res.ok) {
				document.location.replace("/");
			}
		});
	};

	logoutEl.addEventListener("click", userLogout);
}
