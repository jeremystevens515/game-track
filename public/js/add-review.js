const submitButton = document.getElementById('submit');
const textArea = document.getElementById('textArea');
const user_idEl= document.getElementById('user_id');
const game_idEl = document.getElementById('game_id');
const ratingEl = document.getElementById('rating');

async function addReview(event){
    event.preventDefault();
    const reviewText = textArea.value   
    const userID = user_idEl.textContent;
    const gameID = game_idEl.textContent;
    const rating = ratingEl.value;

    const data = {
        review_text: reviewText, 
        user_id: userID, 
        game_id: gameID, 
        rating: rating
    }
    if(!rating){
        submitButton.textContent = "<- Must include a rating!"
        return;        
    }
    const response = await fetch('/user/reviews', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) { 
        submitButton.textContent = "Review added!"
    } 
}


submitButton.addEventListener('click', addReview);
