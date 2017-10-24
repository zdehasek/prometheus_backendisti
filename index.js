'use strict';

const Koa = require('koa');
const KoaRouter = require('koa-router');
const prometheus = require('./prometheus');

const app = new Koa();
const router = new KoaRouter();

prometheus.init();

router.get('/metrics', async (ctx) => {
    const metrics = prometheus.register.metrics();
    ctx.body = metrics;
});

router.get('*', async (ctx) => {
    ctx.body = `
                <a href="/voting?satisfied=yes" target="">
                  <img src="https://emojipedia-us.s3.amazonaws.com/thumbs/160/facebook/111/grinning-face_1f600.png" alt="Smiley face" height="200" width="200">
                </a>
                <a href="/voting?satisfied=no" target="">
                  <img src="https://emojipedia-us.s3.amazonaws.com/thumbs/160/facebook/111/white-frowning-face_2639.png" alt="Sad face" height="200" width="200">                
                </a>
                `;
    if (ctx.query.satisfied === 'yes') {
        prometheus.backendistiVoting.inc({
            name: 'votingApp',
            method: 'get',
            message: ctx.response.message,
            originalUrl: ctx.request.url,
            userAgent: ctx.request.header['user-agent'],
            ip: ctx.request.ip
        }, 3);
    } else if (ctx.query.satisfied === 'no') {
        prometheus.backendistiVoting.dec({
            name: 'votingApp',
            method: 'get',
            message: ctx.response.message,
            originalUrl: ctx.request.url,
            userAgent: ctx.request.header['user-agent'],
            ip: ctx.request.ip
        }, 1);

    }

});

app.use(router.routes());

if (!module.parent) app.listen(process.env.PORT || 8080);
