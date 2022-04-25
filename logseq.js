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
// namespace prefixes collapser =============================================

function hideNamespace() {
  console.info("====== LS HIDE NAMESPACE v20220314 =====");
  let nmsp = document.querySelectorAll(
    'a.page-ref[data-ref*="/"]:not(.hidden-namespace)'
  );
  for (var i = 0; i < nmsp.length; i++) {
    if (nmsp[i].innerText.indexOf("/") !== -1) {
      nmsp[i].innerHTML =
        "<span style='color:rgb(133, 211, 81)'>..</span>" +
        nmsp[i].innerText.substring(nmsp[i].innerText.lastIndexOf("/"));
      nmsp[i].classList.add("hidden-namespace"); 
      //console.info(" namespace off ==> " + nmsp[i].innerText);
    }
  }
}

const updateHideNamespace = throttle(hideNamespace, 1000);
const obsNamespace = new MutationObserver(updateHideNamespace);
obsNamespace.observe(watchTarget, {
  subtree: true,
  attributes: true,
});
//===================================== end of namespace prefixes collapser 
// comments =============================================
function hideCommentsRoute() {
  let comments = document.querySelectorAll(
    'a.page-ref[data-ref*="comments"]:not(.hidden-source)'
  );

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
