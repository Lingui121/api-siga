import { consulta } from "../database/conexao"

export async function getAunosTurmas(req, res){
    try{
        const sql = "SELECT *FROM tabelaalunos_turmas"
        const alunosTurmas = await consulta(sql)
        return res.json(alunosTurmas)
    }catch(erro){
        return res.json(erro)
    }
}

export async function getAlunoTurma(req, res){
    const { id } = req.params
    try{

        const sql1 = "SELECT * FROM tabelaalunos_turmas WHERE IdAlunosTurmas = ?"
        const alunoTurma1 = (await consulta(sql1, [id]))[0]

        if(!alunoTurma1){
            return res.json({mensagem:"Aluno nao existe!"})
        }
        const sql = "SELECT *FROM tabelaalunos_turmas WHERE IdAlunosTurmas = ?"
        const alunoTurma = (await consulta(sql, [id]))[0]
        return res.json(alunoTurma)
    }catch(erro){
        return res.json(erro)
    }
}

export async function createAlunoTurma(req, res){
    const {
		idAluno,
        idTurma
	} = req.body
    try{
        const sql = "INSERT INTO tabelaalunos_Turmas set?"
        const alunoTurma = await consulta(sql,[
            {
                idAluno,
                idTurma
            }
        ])
        return res.json(alunoTurma)
    }catch(erro){
        return res.json(erro)
    }
}

export async function updateAlunoTurma(req, res){
    const { id } = req.params
    const {
        idAluno,
        idTurma
    } = req.body

    try{
        const sql1 = "SELECT * FROM tabelaalunos_turmas WHERE IdAlunosTurmas = ?"
        const alunoTurma1 = (await consulta(sql1, [id]))[0]
        if(!alunoTurma1){
            return res.json({mensagem:" Nao existe na base de Dados"})
        }
        const sql = "UPDATE tabelaalunos_turmas SET ? WHERE IdAlunosTurmas = ?"
        const alunoTurma = await consulta(sql, [{
            idAluno : idAluno ? idAluno : alunoTurma1.idAluno,
            idTurma : idTurma ? idTurma : alunoTurma1.idTurma,
        },
        id
    ])
        return res.json(alunoTurma)
    }catch(erro){
        return res.json(erro)
    }
}

export async function deleteAlunoTurma(req, res){
    const { id } = req.params
    try{

        const sql1 = "SELECT *FROM tabelaalunos WHERE idAluno = ?"
        const alunoTurma1 = (await consulta(sql1, [id]))[0]
        if(!alunoTurma1){
            return res.json({Mensagem: " Nao existe na base de dados"})
        }
        const sql = "DELETE FROM tabelaalunos_turmas WHERE IdAlunosTurmas = ?"
        const alunoTurma = await consulta(sql, [id])
        return res.json(alunoTurma)
    }catch(erro){
        return res.json(erro)
    }
}
