import { consulta } from "../database/conexao"
import jwt from "jsonwebtoken"

export async function getAlunos(req, res){
    try{
        const sql = "SELECT *FROM tabelaalunos"
        const alunos = await consulta(sql)
        return res.json(alunos)
    }catch(erro){
        return res.json(erro)
    }
}

export async function getAluno(req, res){
    const { id } = req.params
    try{

        const sql1 = "SELECT * FROM tabelaalunos WHERE idAluno = ?"
        const aluno1 = (await consulta(sql1, [id]))[0]

        if(!aluno1){
            return res.json({mensagem:"usuario nao existe!"})
        }
        const sql = "SELECT *FROM tabelaalunos WHERE idAluno = ?"
        const aluno = (await consulta(sql, [id]))[0]
        return res.json(aluno)
    }catch(erro){
        return res.json(erro)
    }
}

export async function createAluno(req, res){
    const {
		nome,
		dataDeNascimento,
        genero,
		bairro,
        distrito,
        provincia,
        nacionalidade,
        cell,
        email,
        senha
	} = req.body
    try{
        const sql = "INSERT INTO tabelaalunos set?"
        const aluno = await consulta(sql,[
            {
                nome,
                dataDeNascimento,
                genero,
                bairro,
                distrito,
                provincia,
                nacionalidade,
                cell,
                email,
                senha
            }
        ])
        return res.json(aluno)
    }catch(erro){
        return res.json(erro)
    }
}

export async function updateAluno(req, res){
    const { id } = req.params
    const {
            nome,
            dataDeNascimento,
            genero,
            bairro,
            distrito,
            provincia,
            nacionalidade,
            cell,
            email,
            senha
    } = req.body

    try{

        const sql1 = "SELECT * FROM tabelaalunos WHERE idAluno = ?"
        const aluno1 = (await consulta(sql1, [id]))[0]

        if(!aluno1){
            return res.json({mensagem:"Usuario nao existe na base de Dados"})
        }

        const sql = "UPDATE tabelaalunos SET ? WHERE idAluno = ?"
        const aluno = await consulta(sql, [{
            nome : nome ? nome : aluno1.nome,
            dataDeNascimento : dataDeNascimento ? dataDeNascimento : aluno1.dataDeNascimento,
            genero : genero ? genero : aluno1.genero,
            bairro : bairro ? bairro : aluno1.bairro,
            distrito : distrito ? distrito : aluno1.distrito,
            provincia : provincia ? provincia : aluno1.provincia,
            nacionalidade : nacionalidade ? nacionalidade : aluno1.nacionalidade,
            cell : cell ? cell : aluno1.cell, 
            email : email ? email : aluno1.email,
            senha : senha ? senha : aluno1.senha  
        },
        id
    ])
        return res.json(aluno)
    }catch(erro){
        return res.json(erro)
    }
}

export async function deleteAluno(req, res){
    const { id } = req.params
    try{

        const sql1 = "SELECT *FROM tabelaalunos WHERE idAluno = ?"
        const aluno1 = (await consulta(sql1, [id]))[0]
        if(!aluno1){
            return res.json({Mensagem: "usuario nao existe na base de dados"})
        }
        const sql = "DELETE FROM tabelaalunos WHERE idAlunos = ?"
        const aluno = await consulta(sql, [id])
        return res.json(aluno)
    }catch(erro){
        return res.json(erro)
    }
}

// export async function login(req, res){
//     const { email, senha } = req.body

//     try{
//         const sql = "SELECT * FROM tblusuarios WHERE (emailUsuario = ? AND senhaUsuario = ?)"
//         const usuario = (await consulta(sql, [email, senha]))[0]
//         const {idUsuario, tipoUsuario} = usuario
//         const chave = process.env.CHAVESECRETA
//         const token = jwt.sign({idUsuario, tipoUsuario}, chave)
//         if(usuario){
//             return res.json({token})
//         }
//         return res.json({Mensagem: "Credenciais Invalidas"})
//     }catch(erro){
//         return res.json(erro)
//     }
// }
