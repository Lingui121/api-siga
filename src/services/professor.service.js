import { consulta } from "../database/conexao"

export async function getProfessores(req, res){
    try{
        const sql = "SELECT *FROM tabelaprofessores"
        const professores = await consulta(sql)
        return res.json(professores)
    }catch(erro){
        return res.json(erro)
    }
}

export async function getProfessor(req, res){
    const { id } = req.params
    try{
        const sql1 = "SELECT * FROM tabelaprofessores WHERE idProfessor = ?"
        const professor1 = (await consulta(sql1, [id]))[0]
        if(!professor1){
            return res.json({mensagem:"Nao foi Possivel!"})
        }
        const sql = "SELECT *FROM tabelaprofessor WHERE idProfessor = ?"
        const professor = (await consulta(sql, [id]))[0]
        return res.json(professor)
    }catch(erro){
        return res.json(erro)
    }
}

export async function createProfessor(req, res){
    const {
		nome,
        dataDeNascimento,
        genero,
        bairro,
        distrito,
        provincia,
        nacionalidade,
        grauAcademico,
        cell,
        email,
        senha
	} = req.body
    try{
        const sql = "INSERT INTO tabelaprofessores set?"
        const professor = await consulta(sql,[
            {
                nome,
                dataDeNascimento,
                genero,
                bairro,
                distrito,
                provincia,
                nacionalidade,
                grauAcademico,
                cell,
                email,
                senha
            }
        ])
        return res.json(professor)
    }catch(erro){
        return res.json(erro)
    }
}

export async function updatePeriodo(req, res){
    const { id } = req.params
    const {
        nome,
        dataDeNascimento,
        genero,
        bairro,
        distrito,
        provincia,
        nacionalidade,
        grauAcademico,
        cell,
        email,
        senha
    } = req.body

    try{
        const sql1 = "SELECT * FROM tabelaprofessores WHERE idProfessor = ?"
        const professor1 = (await consulta(sql1, [id]))[0]
        if(!professor1){
            return res.json({mensagem:"Nao foi Possivel"})
        }
        const sql = "UPDATE tabelaprofessores SET ? WHERE idProfessor = ?"
        const professores = await consulta(sql, [{
            nome : nome ? nome : professor1.nome,
            dataDeNascimento : dataDeNascimento ? dataDeNascimento : professor1.dataDeNascimento,
            genero : genero ? genero : professor1.genero,
            bairro : bairro ? bairro : professor1.bairro,
            distrito : distrito ? distrito : professor1.distrito,
            provincia : provincia ? provincia : professor1.provincia,
            nacionalidade : nacionalidade ? nacionalidade : professor1.nacionalidade,
            grauAcademico : grauAcademico ? grauAcademico :professor1.grauAcademico,
            cell : cell ? cell : professor1.cell,
            email : email ? email : professor1.email,
            senha : senha ? senha : professor1.senha
        },
        id
    ])
        return res.json(professores)
    }catch(erro){
        return res.json(erro)
    }
}
export async function deleteProfessor(req, res){
    const { id } = req.params
    try{
        const sql1 = "SELECT *FROM tabelaprofessores WHERE idProfessor = ?"
        const professor1 = (await consulta(sql1, [id]))[0]
        if(!professor1){
            return res.json({Mensagem: "Nao foi Possivel"})
        }
        const sql = "DELETE FROM tabelaProfessores WHERE idProfessor = ?"
        const professor = await consulta(sql, [id])
        return res.json(professor)
    }catch(erro){
        return res.json(erro)
    }
}
