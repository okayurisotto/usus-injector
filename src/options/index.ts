import { browser } from "webextension-polyfill-ts";
import { storageArea, storageKey } from "../common";
import { validateJSON } from "./validateJSON";

const $form = <HTMLFormElement>document.getElementById("form");
const $config = <HTMLTextAreaElement>document.getElementById("config");
const $submit = <HTMLInputElement>document.getElementById("submit");

$submit.value = browser.i18n.getMessage("optionSubmit");

const config =
  (await browser.storage[storageArea].get(storageKey))[storageKey] ?? [];
const json = JSON.stringify(config, undefined, 2);
$config.value = json;

$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const config = validateJSON($config.value);
    await browser.storage[storageArea].set({ [storageKey]: config });
    $config.value = JSON.stringify(config, undefined, 2);
  } catch {
    window.alert("Syntax Error");
  }

  $submit.value = browser.i18n.getMessage("optionSubmitted");
  setTimeout(() => {
    $submit.value = browser.i18n.getMessage("optionSubmit");
  }, 3000);
});
