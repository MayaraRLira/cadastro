"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosRepository = void 0;
const mysql_1 = require("../../../mysql");
const uuid_1 = require("uuid");
class VideosRepository {
    create(request, response) {
        const { user_id, title, description } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('INSERT INTO videos (video_id, user_id, title, description) VALUES (?,?,?,?)', [(0, uuid_1.v4)(), user_id, title, description], (error, results, fileds) => {
                connection.release();
                if (error) {
                    return response.status(400).json(error);
                }
                response.status(200).json({ message: 'Vídeo criado com sucesso' });
            });
        });
    }
    getVideos(request, response) {
        const { user_id } = request.query;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('select * from videos where user_id = ?', [user_id], (error, results, fileds) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: 'Erro aos buscar os vídeos' });
                }
                return response.status(200).json({ message: 'Vídeos retornados com sucesso', videos: results });
            });
        });
    }
    searchVideos(request, response) {
        const { search } = request.query;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('select * from videos where title like ?', [`%${search}%`], (error, results, fileds) => {
                connection.release();
                if (error) {
                    return response.status(400).json({ error: 'Erro aos buscar os vídeos' });
                }
                return response.status(200).json({ message: 'Vídeos retornados com sucesso', videos: results });
            });
        });
    }
}
exports.VideosRepository = VideosRepository;