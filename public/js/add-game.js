let wishlistButton = document.querySelectorAll('.btn-primary');

// Send PUT request to server to Add Game to Wishlist
async function addGame(event){
    event.preventDefault();
    game_id = event.target.id;


    const response = await fetch('/user/wishlist', {
        method: 'POST',
        body: JSON.stringify(
            {game_id}
        ),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) { 
        const alert = document.createElement('p');
        alert.textContent = "ed to Wishlist!"
        event.target.appendChild(alert);
    } 
}

Array.prototype.forEach.call(wishlistButton, (item) => {
    item.addEventListener('click', addGame)
});