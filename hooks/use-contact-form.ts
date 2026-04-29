'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  subject: z.string().min(4, 'Assunto muito curto'),
  message: z.string().min(20, 'Mensagem muito curta — conta mais sobre o projeto'),
})

export type ContactFormValues = z.infer<typeof contactSchema>

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export function useContactForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  })

  const onSubmit = async (data: ContactFormValues) => {
    setStatus('loading')
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      // Replace with real API call: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return { form, status, onSubmit: form.handleSubmit(onSubmit) }
}
