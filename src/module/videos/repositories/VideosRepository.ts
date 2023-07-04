import { pool } from "../../../mysql"; 
import { v4 as uuidv4} from "uuid";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";



class VideosRepository {
    create(request: Request, response: Response){
      
        const { user_id, title, description } = request.body;
                 pool.getConnection((err: any , connection: any) => {
                 
   
             connection.query(
             'INSERT INTO videos (video_id, user_id, title, description) VALUES (?,?,?,?)',
               [uuidv4 (),user_id, title, description],
                  (error:any, results:any, fileds:any) =>{
                    connection.release();
                      if (error) {
                       return response.status(400).json(error)
                         }
                      response.status(200).json({message: 'Vídeo criado com sucesso'});
                     }
                 )
              })
           
        }

        getVideos(request: Request, response: Response){
            const { user_id } = request.query;
                     pool.getConnection((err: any , connection: any) => {
                     
           
                 connection.query(
                    'select * from videos where user_id = ?',
                    [user_id],
                    (error:any, results:any, fileds:any) =>{
                    connection.release();
                        if (error) {
                            return response.status(400).json({error: 'Erro aos buscar os vídeos'})
                        }
                        return response.status(200).json({message: 'Vídeos retornados com sucesso', videos: results})
                    })
                })
            }
        searchVideos(request: Request, response: Response){
                const { search } = request.query;
                         pool.getConnection((err: any , connection: any) => {
                               
                 connection.query(
                    'select * from videos where title like ?',
                    [`%${search}%`],
                    (error:any, results:any, fileds:any) =>{
                    connection.release();
                      if (error) {
                        return response.status(400).json({error: 'Erro aos buscar os vídeos'})
                         }
                        return response.status(200).json({message: 'Vídeos retornados com sucesso', videos: results})
                        })
                    })
                }
        }
    

export { VideosRepository };

















































