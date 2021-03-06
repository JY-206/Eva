/* Codded by @phaticusthiccy
Telegram: t.me/phaticusthiccy
Instagram: www.instagram.com/kyrie.baran
*/

const Asena = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');
const WhatsAsenaStack = require('whatsasena-npm');
let wk = Config.WORKTYPE == 'public' ? false : true
var description = ''
if (Config.LANG == 'TR') description = 'Ağırlık birimlerini dönüştürür.'
if (Config.LANG == 'EN') description = 'Converts weight units.'
if (Config.LANG == 'AZ') description = 'Ağırlıq vahidlərini çevirir.'
if (Config.LANG == 'RU') description = 'Преобразует единицы веса.'
if (Config.LANG == 'ES') description = 'Convierte unidades de peso.'
if (Config.LANG == 'PT') description = 'Converte unidades de peso.'
if (Config.LANG == 'ML') description = 'ഭാരം യൂണിറ്റുകൾ പരിവർത്തനം ചെയ്യുന്നു.'
if (Config.LANG == 'HI') description = 'वजन इकाइयों को परिवर्तित करता है।'
if (Config.LANG == 'ID') description = 'Mengonversi satuan berat.'

Asena.addCommand({pattern: 'unit ?(.*)', fromMe: wk, desc: description, usage: 'unit 1 kg mg // unit <number> <unit1> <unit2>'}, (async (message, match) => {
  var splitted_text = match[1].split(' ')
  var auth_messages = await WhatsAsenaStack.unit_message(Config.LANG)
  if (splitted_text.length < 3) {
    return await message.client.sendMessage(message.jid,auth_messages.unsuccess + auth_messages.values, MessageType.text)
  }
  var unitter = await WhatsAsenaStack.unit(splitted_text[0], splitted_text[1], splitted_text[2])
  if (unitter.error) {
    return await message.client.sendMessage(message.jid,auth_messages.unsuccess + auth_messages.values, MessageType.text)
  }
  var string_result = unitter.result.toString()
  var formatter = auth_messages.success.replace('{number}', splitted_text[0]).replace('{unit1}', splitted_text[1]).replace('{unit2}', splitted_text[2]).replace('{result}', string_result)
  await message.client.sendMessage(message.jid, formatter, MessageType.text, { quoted: message.data })
}));