let removeButton = document.querySelectorAll('.btn-warning');

async function removeGame(event){
    event.preventDefault();
    game_id = event.target.id;


    const response = await fetch('/user/wishlist', {
        method: 'DELETE',
        body: JSON.stringify(
            {id: game_id}
        ),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.reload();
    } 
}

Array.prototype.forEach.call(removeButton, (item) => {
    item.addEventListener('click', removeGame)
});