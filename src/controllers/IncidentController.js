const connection = require('../database/connection')

module.exports = {

    // Lista todas as incidencias
    async index(request, response) {

        const incidents = await connection('incidents').select('*');
        
        return response.json(incidents);

    },

    // Criar uma nova incidencias
    async create(request, response) {

        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })
        
        return response.json({ id })
    },

    // Deletar uma incidencias
    async delete(request, response) {

        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('id' , id)
            .select('ong_id')
            .first();

        if(incidents.ong_id != ong_id) {
            return response.status(401).json({ erro: 'Operation not permitted.' })
        }

        await connection('incidents')
            .where('id', id)
            .delete();

        return response.status(204).send();

    }

}