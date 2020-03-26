const express = require('express');

const routes = express.Router();

routes.get('/user', (request, response) => {
    return response.json({
        evento: 'Semana OmniStack 11.0',
        aluno: 'Samuel Weslley'
    })
});

module.exports = routes;