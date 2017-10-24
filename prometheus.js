'use strict';

const promClient = require('prom-client');

const prometheus = {

    apiSuppliers: null,

    httpError: null,

    register: null,

    init () {

        this.register = new promClient.Registry();

        promClient.collectDefaultMetrics({ register: this.register });

        this.apiSuppliers = new promClient.Counter({
            name: 'apiStatus',
            help: 'Query tracking for API Status',
            labelNames: ['query', 'status', 'message', 'originalUrl'],
            registers: [this.register]
        });

        this.httpError = new promClient.Counter({
            name: 'httpError',
            help: 'Query tracking for API Status',
            labelNames: ['name', 'query', 'status', 'message', 'originalUrl'],
            registers: [this.register]
        });

        this.backendistiVoting = new promClient.Gauge({
            name: 'backendistiVoting',
            help: 'hlasovací metrika pro přednášku backendisti',
            labelNames: ['name', 'query', 'status', 'method', 'message', 'originalUrl', 'userAgent', 'ip'],
            registers: [this.register]
        });


    }

};

module.exports = prometheus;
