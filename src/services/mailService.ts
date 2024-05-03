import emailjs from 'emailjs-com'

export const handleSendMail = async (
  template_name: string,
  template_id: string,
  to_email: string,
  from_email?: string,
  from_name?: string,
  from_phone?: string,
  message?: string,
) => {
  // Configure suas credenciais do EmailJS
  const emailJsConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    template_name: template_name,
    templateId: template_id,
    userId: import.meta.env.VITE_EMAILJS_USER_ID,
  }

  // Configuração do e-mail a ser enviado
  const emailData = {
    to_email: to_email,
    from_email: from_email,
    from_name: from_name,
    from_phone: from_phone,
    message: message,
  }
  // Envio do e-mail usando EmailJS
  try {
    await emailjs.send(
      emailJsConfig.serviceId,
      emailJsConfig.templateId,
      emailData,
      emailJsConfig.userId,
    )
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error)
  }
}
