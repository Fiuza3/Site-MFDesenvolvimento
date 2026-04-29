export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  text: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rafael Duarte',
    role: 'CTO',
    company: 'Contabil.io',
    text: 'Marcus entregou a API fiscal em 6 semanas. Integrou 40 municípios no prazo, zero retrabalho. Comunica bloqueios antes de virarem problema — raro em freelancer.',
  },
  {
    id: '2',
    name: 'Juliana Mota',
    role: 'Produto',
    company: 'FlowRH',
    text: 'Contratei esperando um dev, ganhei um co-fundador técnico. Questionou premissas do produto, sugeriu simplificações que economizaram 3 meses de desenvolvimento.',
  },
  {
    id: '3',
    name: 'Pedro Azevedo',
    role: 'Diretor de TI',
    company: 'Transportes Minas',
    text: 'Migrou nosso ERP legado em PHP para uma stack moderna sem parar a operação. Performance do sistema triplicou. Equipe adotou sem resistência.',
  },
  {
    id: '4',
    name: 'Camila Rocha',
    role: 'CEO',
    company: 'Broker Suite',
    text: 'O CRM ficou exatamente como desenhamos — sem funcionalidades desnecessárias, sem escopo inflado. Código limpo, documentação clara, handoff fácil.',
  },
]
