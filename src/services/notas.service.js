import { consulta } from "../database/conexao"

export async function getNotas(req, res){
    try{
        const sql = "SELECT *FROM tabelanotas"
        const notas = await consulta(sql)
        return res.json(notas)
    }catch(erro){
        return res.json(erro)
    }
}

export async function getNota(req, res){
    const { id } = req.params
    try{
        const sql1 = "SELECT * FROM tabelanotas WHERE idNota = ?"
        const nota1 = (await consulta(sql1, [id]))[0]
        if(!nota1){
            return res.json({mensagem:"Nao foi Possivel!"})
        }
        const sql = "SELECT *FROM tabelanotas WHERE idNota = ?"
        const nota = (await consulta(sql, [id]))[0]
        return res.json(nota)
    }catch(erro){
        return res.json(erro)
    }
}

export async function createNota(req, res){
    const {
		idAluno,
        idDisciplina,
        idTurma,
        nota,
        tipoDeAvaliacao,
        dataDeLancamento
	} = req.body
    try{
        const sql = "INSERT INTO tabelanotas set?"
        const nota = await consulta(sql,[
            {
                idAluno,
                idDisciplina,
                idTurma,
                nota,
                tipoDeAvaliacao,
                dataDeLancamento
            }
        ])
        return res.json(nota)
    }catch(erro){
        return res.json(erro)
    }
}

export async function updateNota(req, res){
    const { id } = req.params
    const {
        idAluno,
        idDisciplina,
        idTurma,
        nota,
        tipoDeAvaliacao,
        dataDeLancamento
    } = req.body

    try{
        const sql1 = "SELECT * FROM tabelanotas WHERE idNota = ?"
        const nota1 = (await consulta(sql1, [id]))[0]
        if(!nota1){
            return res.json({mensagem:"Nao foi Possivel"})
        }
        const sql = "UPDATE tabelanotas SET ? WHERE idNota = ?"
        const notas = await consulta(sql, [{
            idAluno : idAluno ? idAluno : nota1.idAluno,
            idDisciplina : idDisciplina ? idDisciplina : nota1.idDisciplina,
            idTurma : idTurma ?  idTurma : nota1.idTurma,
            nota : nota ? nota : nota1.nota,
            tipoDeAvaliacao : tipoDeAvaliacao ? tipoDeAvaliacao : nota1.tipoDeAvaliacao,
            dataDeLancamento : dataDeLancamento ? dataDeLancamento : nota1.tipoDeAvaliacao
        },
        id
    ])
        return res.json(notas)
    }catch(erro){
        return res.json(erro)
    }
}
export async function deleteNotas(req, res){
    const { id } = req.params
    try{
        const sql1 = "SELECT *FROM tabelanotas WHERE idNota = ?"
        const nota1 = (await consulta(sql1, [id]))[0]
        if(!nota1){
            return res.json({Mensagem: "Nao foi Possivel"})
        }
        const sql = "DELETE FROM tabelanotas WHERE idNota = ?"
        const nota = await consulta(sql, [id])
        return res.json(nota)
    }catch(erro){
        return res.json(erro)
    }
}
