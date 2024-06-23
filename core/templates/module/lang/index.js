import en from "./en";
import {addMessages} from "@/core/plugins/i18n/helpers";

export function initMessages() {
  addMessages({
    en: en,
  })
}
