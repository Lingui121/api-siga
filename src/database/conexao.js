import mysql from "mysql"

const conexao = mysql.createConnection({
    host:"localhost",
    port:"3306",
    password:"",
    database:"dbsiga",
    user:"root"
})

conexao.connect(function(erro){
    if(erro){
        console.log(erro)
    }else{
        console.log("Conexao bem sucedida!")
    }
})

export function consulta(sql, dados=[]){
    return new Promise(function(resolve, reject){
        conexao.query(sql, dados, function(erro, result){
            if(erro){
                return reject(erro)
            }
            return resolve(result)
        })
    })    
}
