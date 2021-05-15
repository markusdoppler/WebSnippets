export function Rater(ratingElement) {
  const stars = ratingElement.querySelectorAll('.star');

  const setRating = event => {
    ratingElement.setAttribute('data-rating', event.currentTarget.getAttribute('data-value'));
  };

  const ratingHover = event => {
    const currentHover = event.currentTarget.getAttribute('data-value');
    highlightRating(currentHover);
  };

  const resetRating = event => {
    const currentRating = ratingElement.getAttribute('data-rating');
    highlightRating(currentRating);
  };

  const highlightRating = (rating) => {
    stars.forEach(star => {
      star.style.color = rating >= star.getAttribute('data-value') ? 'yellow' : 'gray';
    });
  };

  resetRating();

  stars.forEach(star => {
    star.addEventListener('mouseover', ratingHover);
  });

  ratingElement.addEventListener('mouseout', resetRating);

}