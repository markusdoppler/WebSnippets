$(document).ready(() => {
  var scrollLink = $('.scroll-link')

  scrollLink.click(function(e) {
    e.preventDefault()
    $('body, html').animate(
      {
        scrollTop: $(this.hash).offset().top
      }, 1000)
  })

  $('.scroll-button').click(() => {
    $(this).scrollToTop()
  })

  $(window).scroll(() => {
    var scrollBarLocation = $(this).scrollTop()
    const documentHeight = $(this).innerHeight()

    scrollLink.each(function() {
      const sectionOffset = $(this.hash).offset().top
      if (scrollBarLocation >= sectionOffset - 20) {
        $(this).parent().addClass('active')
        $(this).parent().siblings().removeClass('active')
      }
    })
  })
})
