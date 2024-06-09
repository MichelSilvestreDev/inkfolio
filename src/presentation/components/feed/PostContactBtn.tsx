import { Button } from "@nextui-org/react";

interface IContact {
  title: string
  phone: string
}

const PostContactBtn: React.FC<IContact> = ({title, phone}) => {
  const message = `Olá! Acabei de encontrar uma tatuagem que me interessou muito no Inkfolio, chamada ${title}, Será que poderíamos conversar para discutir um orçamento? Fico no aguardo do seu retorno. Obrigado!`;
  
  const handleShareOnWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  return (
    <>
      <Button
        onClick={handleShareOnWhatsApp}
        radius="full"
        size="sm"
        className='mt-2 min-w-16 px-8'
        color='primary'
      >
        Pedir orçamento
      </Button>
    </>
  )
}

export default PostContactBtn