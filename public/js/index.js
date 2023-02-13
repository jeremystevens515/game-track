// Send DELETE request to server to Logout
async function logOut(event){
    event.preventDefault();
    console.log("Click!")
}

document.querySelector('#logout-btn').addEventListener('click', logOut)

