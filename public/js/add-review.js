const reviewButton = document.getElementById('submit');
const reviewText = document.querySelector('#review-text')

const leaveReview =(event)=>{
    event.preventDefault();
    console.log('click')

    // const response = await fetch('/user/reviews', {
    //     method: 'POST',
    //     body: JSON.stringify(

    //     )
    // })

}

reviewButton.addEventListener('click', leaveReview)