const abbreviatedMonthName = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

const dateIsValid = (date: Date) => {
  return Object.prototype.toString.call(date) === '[object Date]'
}

export const formatDate = (date: string, format?: 'short' | 'long') => {
  const dateObject = new Date(date)

  if (dateIsValid(dateObject)) {
    // Use métodos UTC para obter o dia, mês e ano no fuso horário UTC
    const day = dateObject.getUTCDate()
    const monthIndex = dateObject.getUTCMonth()
    const monthName = abbreviatedMonthName[monthIndex]
    const year = dateObject.getUTCFullYear()

    // Restaure a hora local para obter a data correta em relação ao fuso horário do sistema
    dateObject.setHours(0, 0, 0, 0)

    // Format the return
    const longFormat = `${day} de ${monthName} de ${year}`
    const shortFormat = `${day} de ${monthName}`

    if (format) {
      return (format === 'long' && longFormat) || (format === 'short' && shortFormat)
    } else {
      return longFormat
    }
  } else {
    console.error('Date invalid')
  }
}
