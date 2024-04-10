const UserSchema = require('../models/User')
const HouseSchema = require('../models/House')
const MessageSchema = require('../models/Message')

const resolvers = {    
        hello: () => {
            return "Hola Mundo!";
        },
        User: async (_, {id}) => {
            try {
                return user = await UserSchema.findById(id);
            }catch(e){
                console.log()
            }
        },
        Users: async () => {
            try{
                return await UserSchema.find();
            }
            catch(e){
                console.log(e)
            }
        },  
        UsersByFilter: async (_, {filter}) => {
            try{
                let query = {};
                if(filter){
                    if(filter.name){
                        // {name: "Mar"}
                        query.name = { $regex: filter.name, $options: 'i' } // 'i' se utiliza para hacer una busqueda insesible de mayusculas y minusculas
                    }
                    if(filter.email){
                        // {email: "juan@"}
                        query.email = { $regex: filter.email, $options: 'i'}
                    }
                    if(filter.lastname){
                        // {lastname: "San"}
                        query.lastname = { $regex: filter.lastname, $options: 'i' }
                    }

                    const users = await UserSchema.find(query)
                    return users;
                }

            }catch(e){
                console.log("Error obteniendo el usuario")

            }
        },

        Message: async (_, { id }) => {
            try {
                return await MessageSchema.findById(id);
            } catch (error) {
                console.log(error);
            }
        },
        Messages: async () => {
            try {
                return await MessageSchema.find();
            } catch (error) {
                console.log(error);
            }
        },
        MessagesByFilter: async (_, { filter }) => {
            try {
                let query = {};
    
                if (filter.body) {
                    query.body = { $regex: filter.body, $options: 'i' };
                }
    
                if (filter.from) {
                    query.from = filter.from;
                }
    
                if (filter.to) {
                    query.to = filter.to;
                }
    
                if (filter.readed !== undefined) {
                    query.readed = filter.readed;
                }
    
                const messages = await MessageSchema.find(query);
                return messages;
            } catch (error) {
                console.log(error);
            }
        },

        House: async (_, {id}) => {
            try {
                return house = await HouseSchema.findById(id)
            } catch (err) {
                console.log(err);
            }
        },
        Houses: async () => {
            try {
                return await HouseSchema.find()
            } catch (error) {
                console.log(error);
            }
        },
        HouseByFilter: async (_, {filter}) => {
            try {
                let query = {}
        
                if (filter.city) {
                    query.city = { $regex: filter.city, $options: 'i' }
                }
        
                if (filter.state) {
                    query.state = { $regex: filter.state, $options: 'i' }
                }
        
                if (filter.size) {
                    query.size = filter.size;
                }
        
                if (filter.type) {
                    query.type = { $regex: filter.type, $options: 'i' }
                }
        
                if (filter.zip_code) {
                    query.zip_code = { $regex: filter.zip_code, $options: 'i' }
                }
        
                if (filter.rooms) {
                    query.rooms = filter.rooms;
                }
        
                if (filter.bathrooms) {
                    query.bathrooms = filter.bathrooms;
                }
        
                if (filter.parking !== undefined) {
                    query.parking = filter.parking;
                }
        
                if (filter.price) {
                    query.price = filter.price;
                }
        
                if (filter.code) {
                    query.code = { $regex: filter.code, $options: 'i' }
                }
        
                // Agrega más filtros según sea necesario
        
            } catch (error) {
                // Manejo de errores
            }
        }
        


}
module.exports = resolvers