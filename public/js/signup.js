let signupButton = document.querySelector('.btn-primary');

// Send PUT request to server to Add Game to Wishlist
function signup(event){
    event.preventDefault();
    let user_name = document.getElementById('signupUsername').value.trim();
    let user_password = document.getElementById('password').value.trim();

    console.log("click", user_name, user_password)
    fetch('/user/signup', {
        method: 'POST',
        body: JSON.stringify({
            username: user_name, 
            password: user_password}
        ),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res)=>{
        if(res.ok){
            document.location.replace('/');
        }
    });
}
signupButton.addEventListener('click', signup)