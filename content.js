const mainContainerSelector = "#main"; // first screen and chat screens container
const mainScreenSelector = ".i5ly3._2l_Ww ._27KDP"; // the first screen when the app loads
const buttonsSelector = "._1UuMR .chGSa.LhZF7"; // right buttons container
const closeButtonSelector = "#close-chat"; // custom selector setted by me in the html string
const buttonPathSelector = `${closeButtonSelector} path`; // selector for the tag that handles the icon color
const activeChatSelector = '._1MZWu [aria-selected="true"]'; // list item for the active chat
const activeChatClass = "_1GGbM"; // class that adds the selected style to the active chat list item

const emojiWindowSelector = "._3Xjbn ._3Xjbn"; // window that pops up when press the emoji icon
const mediaWindowSelector = "._38iEl"; // window that opens when watching an image or a video o to share a contact
const rightDrawerSelector = ".i5ly3._299go .WnX2e ._38iEl"; // drawer that opens when searching in a chat or viewing a contact profile
const attachIconsSelector = "._2wfYK.lpKIg"; // floating buttons that open when pressing the attach icon

const closeButton = $.parseHTML(`
<div class="_2wfYK">
    <button class="hYtwT" id="close-chat">
        <span data-testid="x" data-icon="x" class="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z">
                </path>
            </svg>
        </span>
    </button>
    <span></span>
</div>`);

const darkButton = "#b1b3b5";
const lightButton = "#919191";

let mainScreen;
let darkTheme = false;

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (!mutation.addedNodes) return;

    if ($(mainScreenSelector).length) {
      if (!mainScreen)
        setTimeout(() => {
          mainScreen = $(mainScreenSelector);
        }, 500);
    }

    if ($("body").hasClass("dark")) {
      darkTheme = true;
    } else {
      darkTheme = false;
    }

    if ($(buttonsSelector).length && !$(closeButtonSelector).length) {
      $(buttonsSelector).append(closeButton);

      $(buttonPathSelector).prop("style", `fill: ${darkTheme ? darkButton : lightButton};`);

      $(closeButtonSelector).click(closeChat);
    }
  });
});

const closeChat = () => {
  // $(mainContainerSelector).children().prop("style", "z-index: -1;");

  $(mainContainerSelector).prepend(mainScreen);
  $(mainScreenSelector).prop("style", "z-index: 999999;");

  $(activeChatSelector).children().removeClass(activeChatClass);
  $(activeChatSelector).parent().click(reopenChat);
};

const reopenChat = () => {
  // $(mainContainerSelector).children().prop("style", "z-index: 1;");

  $(mainScreenSelector).remove();

  $(activeChatSelector).children().addClass(activeChatClass);
};

$(document).keyup(function (e) {
  if (e.key === "Escape") {
    // escape key maps to keycode 27
    // close the chat on Esc key press
    // const isEnabled = localStorage.getItem("close-on-esc");

    if ($(mediaWindowSelector).length) return;

    if ($(rightDrawerSelector).length) return;

    if ($(attachIconsSelector).length) return;

    if ($(emojiWindowSelector).length) return;

    closeChat();
  }
});

// $(document).ready(function () {
//   let isEnabled = localStorage.getItem("close-on-esc");

//   if (!isEnabled) {
//     isEnabled = "true";

//     localStorage.setItem("close-on-esc", isEnabled);
//   }

//   $("#close-on-esc").prop("checked", isEnabled === "true" ? true : false);

//   alert("adasdasds");
//   $("#close-on-esc").change(function () {
//     alert("adasdasds");
//     localStorage.setItem("close-on-esc", this.checked);
//     $(this).prop("checked", this.checked);
//   });
// });

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: false,
  characterData: false
});
