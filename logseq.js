// common =================================================================
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

// throttle MutationObserver
// from https://stackoverflow.com/a/52868150
const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = setTimeout(() => (inThrottle = false), limit);
    }
  };
};
const watchTarget = document.getElementById("app-container");
// comments =============================================
function hideCommentsRoute() {
  console.info("====== Comments =====");
  let comments = document.querySelectorAll(
    'a.page-ref[data-ref*="comments"]:not(.hidden-source)'
  );
  console.log(comments);
  for (var i = 0; i < comments.length; i++) {
    let ref =
      comments[i].parentNode.parentNode.parentNode.parentNode.parentNode;
    let hide = ref.nextElementSibling;
    if (hide !== undefined && hide !== null) {
      hide.style.display = "none";
      comments[i].classList.add("hidden-source");
    }
  }
}
const updateCommentsStyle = throttle(hideCommentsRoute, 1000);
const obsComments = new MutationObserver(updateCommentsStyle);
obsComments.observe(watchTarget, {
  subtree: true,
  attributes: true,
});
//===================================== end of comments
