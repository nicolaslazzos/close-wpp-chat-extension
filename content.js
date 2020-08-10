const mainScreenSelector = '._1kdBg';
const buttonsSelector = '._3nq_A ._3All_';
const closeButtonSelector = '._3nq_A .t4a8o';
const buttonPathSelector = '.PVMjB path'

let mainScreen;
const closeButton = $.parseHTML('<div class="PVMjB"> <button class="t4a8o" id="close-chat" onclick="closeChat()"> <span data-testid="x" data-icon="x" class=""> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"> <path fill="currentColor" d="M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z"> </path> </svg> </span> </button> <span></span></div>');

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {

    if (!mutation.addedNodes) return;

    if ($(mainScreenSelector).length) {
      if (!mainScreen) setTimeout(() => { mainScreen = $(mainScreenSelector) }, 500);
    }

    if ($(buttonsSelector).length && !$(closeButtonSelector).length) {
      $(buttonsSelector).append(closeButton);

      const color = $(buttonPathSelector).first().attr('style');
      console.log(color)
      $('#close-chat path').prop('fill', color);

      $(closeButtonSelector).click(closeChat);

      console.log('close button added');
    }
  })
})

const closeChat = () => {
  $('#main').children().prop('style', 'z-index: -1;');
  $('#main').prepend(mainScreen);
  $(mainScreenSelector).prop('style', 'z-index: 1;');
}

observer.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });