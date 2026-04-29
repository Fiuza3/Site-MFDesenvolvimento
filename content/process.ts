export interface ProcessStep {
  step: string
  title: string
  description: string
  duration: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '00',
    title: 'Diagnóstico',
    description:
      'Reunião de 60 min. Entendo o problema real, não o sintoma. Levanto restrições técnicas e de negócio antes de qualquer proposta.',
    duration: '1 semana',
  },
  {
    step: '01',
    title: 'Proposta técnica',
    description:
      'Documento com escopo, stack escolhida com justificativa, marcos e critérios de aceite. Sem ambiguidade.',
    duration: '3 dias',
  },
  {
    step: '02',
    title: 'Desenvolvimento',
    description:
      'Sprints de 2 semanas. Deploy contínuo em staging. Você vê o progresso toda semana, não só na entrega final.',
    duration: 'variável',
  },
  {
    step: '03',
    title: 'Revisão & Ajustes',
    description:
      'Ciclo de feedback estruturado. Alterações de escopo documentadas e precificadas — sem surpresas na nota fiscal.',
    duration: '1 semana',
  },
  {
    step: '04',
    title: 'Entrega & Handoff',
    description:
      'Deploy em produção, documentação, variáveis de ambiente e runbook de incidentes. Suporte de 30 dias incluído.',
    duration: '1 semana',
  },
]
