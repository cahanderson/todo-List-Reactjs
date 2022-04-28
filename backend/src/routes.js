// const { request, response } = require('express')
const express = require('express')
const todos = [{name:"carlos", status:false}];
const routes = express.Router()
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

// C - Crud
routes.post("/todo", async (request, response)=>{
    const {name} = request.body;
    const todo =  await prisma.todo.create({
        data:{
            name,
        },
    })
    return response.status(201).json(todo)
});
// R - Crud
routes.get("/todo",async (request, response)=>{
    const todos = await prisma.todo.findMany()
    return response.status(200).json(todos)
})

// U - Crud

routes.put("/todo", async (request, response) =>{
    const {id, name, status} = request.body

    //verificação
    if(!id){
        return response.status(400).json("ID is mandatory")
    }
    const todoExist = await prisma.todo.findUnique({where: {id} })
    if(!todoExist){
        return response.status(404).json("todo not exist")
    }
    
    const todos = await prisma.todo.update({
        where:{ id },
        data:{
            name,
            status
        },
    })
    return response.status(200).json(todos)
})

// D - Crud

routes.delete("/todo/:id", async(request, response) =>{
    const{id} = request.params
    const intId = parseInt(id)
    
    if(!intId){
        return response.status(400).json("ID is mandatory")
    }
    const todoExist = await prisma.todo.findUnique({where: {id:intId} })
    if(!todoExist){
        return response.status(404).json("todo not exist")
    }

    await prisma.todo.delete({
        where:{
            id : intId,
        }
    })
    return response.status(200).send()
})
module.exports = routes;