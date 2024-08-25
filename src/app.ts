import { createBot, createProvider, createFlow, MemoryDB } from '@bot-whatsapp/bot'

import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

const main = async () => {

    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http.server.post('/send-message', handleCtx(async (bot, req, res) =>{
        const body = req.body
        const phone = body.phone
        const message = body.message
        const mediaUrl = body.mediaUrl
        await bot.sendMessage(phone,message,{})
        res.end('Acabado')
    }))

    await createBot({
        database: new MemoryDB(),
        flow: createFlow([flowBienvenida]),
        provider
    })
}

main()
