import mongoose from 'mongoose'
import { Crianca } from '@fullstack/types'

const ChildrenSchema = new mongoose.Schema<Crianca>({
    id: { type: String, required: true, unique: true },
  nome: String,
  data_nascimento: String,
  bairro: String,
  responsavel: String,
  saude: {
    ultima_consulta: String,
    vacinas_em_dia: Boolean,
    alertas: [String],
  },
  educacao: {
    escola: String,
    frequencia_percent: Number,
    alertas: [String],
  },
  assistencia_social: {
    cad_unico: Boolean,
    beneficio_ativo: Boolean,
    alertas: [String],
  },
  revisado: { type: Boolean, default: false },
  revisado_por: String,
  revisado_em: String,
},
{
  _id: true,
  id:false,
}
)

export const ChildrenModel = mongoose.model<Crianca>('Crianca', ChildrenSchema)
