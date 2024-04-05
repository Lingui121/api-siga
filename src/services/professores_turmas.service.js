import { consulta } from "../database/conexao"

export async function getProfessoresTurmas(req, res){
    try{
        const sql = "SELECT *FROM tabelaprofessores_turmas"
        const professoresTurmas = await consulta(sql)
        return res.json(professoresTurmas)
    }catch(erro){
        return res.json(erro)
    }
}

export async function getProfessor(req, res){
    const { id } = req.params
    try{
        const sql1 = "SELECT * FROM tabelaprofessores_turmas WHERE idProfessoresTurmas = ?"
        const professoresTurmas1 = (await consulta(sql1, [id]))[0]
        if(!professoresTurmas1){
            return res.json({mensagem:"Nao foi Possivel!"})
        }
        const sql = "SELECT *FROM tabelaprofessores_turmas WHERE idProfessoresTurmas = ?"
        const professoresTurmas = (await consulta(sql, [id]))[0]
        return res.json(professoresTurmas)
    }catch(erro){
        return res.json(erro)
    }
}

export async function createProfessorTurma(req, res){
    const {
		idProfessor,
        idTurma
	} = req.body
    try{
        const sql = "INSERT INTO tabelaprofessores_turmas set?"
        const professoresTurmas = await consulta(sql,[
            {
                idProfessor,
                idTurma
            }
        ])
        return res.json(professoresTurmas)
    }catch(erro){
        return res.json(erro)
    }
}

export async function updateProfessorTurma(req, res){
    const { id } = req.params
    const {
        idProfessor,
        idTurma
    } = req.body

    try{
        const sql1 = "SELECT * FROM tabelaprofessores_turmas WHERE idProfessorTurmas = ?"
        const professorTurmas1 = (await consulta(sql1, [id]))[0]
        if(!professorTurmas1){
            return res.json({mensagem:"Nao foi Possivel"})
        }
        const sql = "UPDATE tabelaprofessores_turmas SET ? WHERE idProfessoresTurma = ?"
        const professoresTurmas = await consulta(sql, [{
            idProfessor : idProfessor ? idProfessor : professorTurmas1.idProfessor,
            idTurma : idTurma ? idTurma : professorTurmas1.idTurma
        },
        id
    ])
        return res.json(professoresTurmas)
    }catch(erro){
        return res.json(erro)
    }
}
export async function deleteProfessorTurma(req, res){
    const { id } = req.params
    try{
        const sql1 = "SELECT *FROM tabelaprofessores_turmas WHERE idProfessoresTurmas = ?"
        const professorTurma1 = (await consulta(sql1, [id]))[0]
        if(!professorTurma1){
            return res.json({Mensagem: "Nao foi Possivel"})
        }
        const sql = "DELETE FROM tabelaProfessores_turmas WHERE idProfessoresTurma = ?"
        const professoresTurmas = await consulta(sql, [id])
        return res.json(professoresTurmas)
    }catch(erro){
        return res.json(erro)
    }
}
