import { consulta } from "../database/conexao"

export async function getAunosDisciplinasTurmasProfessores(req, res){
    try{
        const sql = "SELECT *FROM tabeladisciplinas_turmas_professores"
        const disciplinasTurmasProfessores = await consulta(sql)
        return res.json(disciplinasTurmasProfessores)
    }catch(erro){
        return res.json(erro)
    }
}

export async function getDisciplinaTurmaProfessor(req, res){
    const { id } = req.params
    try{
        const sql1 = "SELECT * FROM tabeladisciplinas_turmas_professores WHERE idDisciplinaTurmasProfessores = ?"
        const disciplinaTurmasProfessores1 = (await consulta(sql1, [id]))[0]
        if(!disciplinaTurmasProfessores1){
            return res.json({mensagem:"Nao foi Possivel!"})
        }
        const sql = "SELECT *FROM tabeladisciplinas_turmas_professores WHERE idDisciplinaTurmasProfessores = ?"
        const disciplinasTurmasProfessores = (await consulta(sql, [id]))[0]
        return res.json(disciplinasTurmasProfessores)
    }catch(erro){
        return res.json(erro)
    }
}

export async function createDisciplinaTurmaProfessor(req, res){
    const {
		idDisciplina,
        idTurma,
        idProfessor
	} = req.body
    try{
        const sql = "INSERT INTO tabeladisciplinas_turmas_professores set?"
        const disciplinaTurmaProfessor = await consulta(sql,[
            {
                idDisciplina,
                idTurma,
                idProfessor
            }
        ])
        return res.json(disciplinaTurmaProfessor)
    }catch(erro){
        return res.json(erro)
    }
}

export async function updateDisciplinaTurmaProfessor(req, res){
    const { id } = req.params
    const {
        idDisciplina,
        idTurma,
        idProfessor
    } = req.body

    try{
        const sql1 = "SELECT * FROM tabeladisciplinas_turmas_professores WHERE idDisciplinaTurmasProfessores = ?"
        const disciplinaTurmasprofessores1 = (await consulta(sql1, [id]))[0]
        if(!disciplinaTurmasprofessores1){
            return res.json({mensagem:"Nao foi Possivel"})
        }
        const sql = "UPDATE tabeladisciplinas_turmas_professores SET ? WHERE idDisciplinaTurmasProfessores = ?"
        const disciplinaTurmaProfessor = await consulta(sql, [{
            idDisciplina : idDisciplina ? idDisciplina : disciplinaTurmasprofessores1.idDisciplina,
            idTurma : idTurma ? idTurma : disciplinaTurmasprofessores1.idTurma,
            idProfessor : idProfessor ?  idProfessor : disciplinaTurmasprofessores1.idProfessor
        },
        id
    ])
        return res.json(disciplinaTurmaProfessor)
    }catch(erro){
        return res.json(erro)
    }
}

export async function deleteDisciplina(req, res){
    const { id } = req.params
    try{
        const sql1 = "SELECT *FROM tabeladisciplinas_turmas_professores WHERE isDisciplinaTurmasProfessores = ?"
        const disciplinaTurmaProfessor1= (await consulta(sql1, [id]))[0]
        if(!disciplinaTurmaProfessor1aTurmaProfessor1){
            return res.json({Mensagem: "Nao foi Possivel"})
        }
        const sql = "DELETE FROM tabeladisciplinas_turmas_professores WHERE idDisciplinaTurmasProfessores = ?"
        const disciplinaTurmaProfessor = await consulta(sql, [id])
        return res.json(disciplinaTurmaProfessor)
    }catch(erro){
        return res.json(erro)
    }
}
