import { consulta } from "../database/conexao"

export async function getAunosDisciplinas(req, res){
    try{
        const sql = "SELECT *FROM tabeladisciplinas"
        const disciplinas = await consulta(sql)
        return res.json(disciplinas)
    }catch(erro){
        return res.json(erro)
    }
}

export async function getDisciplina(req, res){
    const { id } = req.params
    try{
        const sql1 = "SELECT * FROM tabeladisciplinas WHERE idDisciplina = ?"
        const disciplina1 = (await consulta(sql1, [id]))[0]

        if(!disciplina1){
            return res.json({mensagem:"Disciplina nao existe!"})
        }
        const sql = "SELECT *FROM tabeladisciplina WHERE idDisciplina = ?"
        const disciplina = (await consulta(sql, [id]))[0]
        return res.json(disciplina)
    }catch(erro){
        return res.json(erro)
    }
}

export async function createDisciplina(req, res){
    const {
		nome,
        cargaHoraria
	} = req.body
    try{
        const sql = "INSERT INTO tabelaalunos_Turmas set?"
        const disciplina = await consulta(sql,[
            {
                nome,
                cargaHoraria
            }
        ])
        return res.json(disciplina)
    }catch(erro){
        return res.json(erro)
    }
}

export async function updateDisciplina(req, res){
    const { id } = req.params
    const {
        nome,
        cargaHoraria
    } = req.body

    try{
        const sql1 = "SELECT * FROM tabeladisciplina WHERE idDisciplina = ?"
        const disciplina1 = (await consulta(sql1, [id]))[0]
        if(!disciplina1){
            return res.json({mensagem:"Disciplina Nao Encontrada"})
        }
        const sql = "UPDATE tabeladisciplina SET ? WHERE idDisciplina = ?"
        const disciplina = await consulta(sql, [{
            nome : nome ? nome : disciplina1.nome,
            cargaHoraria : cargaHoraria ? cargaHoraria : disciplina1.cargaHoraria,
        },
        id
    ])
        return res.json(disciplina)
    }catch(erro){
        return res.json(erro)
    }
}

export async function deleteDisciplina(req, res){
    const { id } = req.params
    try{
        const sql1 = "SELECT *FROM tabeladisciplina WHERE isDisciplina = ?"
        const disciplina1= (await consulta(sql1, [id]))[0]
        if(!disciplina1){
            return res.json({Mensagem: " Disciplina Nao Encontrada"})
        }
        const sql = "DELETE FROM tabelaalunos_turmas WHERE IdAlunosTurmas = ?"
        const disciplina = await consulta(sql, [id])
        return res.json(disciplina)
    }catch(erro){
        return res.json(erro)
    }
}
