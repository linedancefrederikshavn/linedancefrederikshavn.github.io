import "./utils/navigo_Edited.js";
import { setActiveLink, renderTemplate, loadHtml } from "./utils/utils.js";
import { initForside } from "./pages/forside/index.js";
import { initUndervisning } from "./pages/undervisning/index.js";
import { initOpvisning } from "./pages/opvisning/index.js";
import { initGalleri } from "./pages/galleri/index.js";
import { initKontakt } from "./pages/kontakt/index.js";

window.addEventListener("load", async () => {

  const templateForside = await loadHtml("./pages/forside/index.html");
  const templateUndervisning = await loadHtml("./pages/undervisning/index.html");
  const templateOpvisning = await loadHtml("./pages/opvisning/index.html");
  const templateGalleri = await loadHtml("./pages/galleri/index.html");
  const templateKontakt = await loadHtml("./pages/kontakt/index.html");
  const templateNotFound = await loadHtml("./pages/error/index.html");

  const router = new Navigo("/", { hash: false });
  window.router = router;

  router
    .hooks({
      before(done, match) {
        setActiveLink("topnav", match.url);
        done();
      }
    })
    .on({
      "/": () => {
        renderTemplate(templateForside, "content");
        initForside();
      },
      "/undervisning": () => {
        renderTemplate(templateUndervisning, "content");
        initUndervisning();
      },
      "/opvisning": () => {
        renderTemplate(templateOpvisning, "content");
        initOpvisning();
      },
      "/galleri": () => {
        renderTemplate(templateGalleri, "content");
        initGalleri();
      },
      "/kontakt": () => {
        renderTemplate(templateKontakt, "content");
        initKontakt();
      },
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content");
    })
    .resolve();
});
window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}

