import {Configs} from "@/core/tools/Configs";

/**
 * Add messages
 */
export function addMessages(data) {
  const settings = Configs.get('plugins.i18n', {})
  const messages = settings?.messages;
  settings?.fallbackLocale?.forEach((lang) => {
    messages[lang] = {...messages[lang], ...data[lang]};
  })
  Configs.push('plugins.i18n.messages', messages)
}
