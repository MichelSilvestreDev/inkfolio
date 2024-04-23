import { ITattooStyles } from '../../types/posts.types'
// Tattoo Styles Images
import oldSchoolImg from '/img/tattoo-styles/old-school.jpg'
import realismImg from '/img/tattoo-styles/realism.jpg'
import blackAndGrayImg from '/img/tattoo-styles/black-and-gray.png'
import newchoolImg from '/img/tattoo-styles/new-school.png'
import irezumiImg from '/img/tattoo-styles/irezumi.png'
import waterColorImg from '/img/tattoo-styles/watercolor.png'
import geometricImg from '/img/tattoo-styles/geometric.png'
import dotworkImg from '/img/tattoo-styles/dotwork.png'
import finelineImg from '/img/tattoo-styles/fineline.png'
import tribalImg from '/img/tattoo-styles/tribal.png'

const tattooStyles: ITattooStyles[] = [
  {
    name: 'Old School',
    description:
      'Este estilo apresenta linhas fortes, cores sólidas e imagens icônicas como âncoras, rosas e andorinhas. Tem um visual clássico com apelo atemporal.',
    img: oldSchoolImg,
    value: 'old-school',
    url: 'old-school',
  },
  {
    name: 'Realismo',
    description:
      'Tatuagens realistas visam representar assuntos com detalhes realistas, muitas vezes se assemelhando a fotografias. Este estilo pode incluir retratos, animais, paisagens e objetos intricados.',
    img: realismImg,
    value: 'realism',
    url: 'realismo',
  },
  {
    name: 'Preto e Cinza',
    description:
      'Utilizando tons de tinta preta e cinza, este estilo foca em criar profundidade e dimensão por meio de contraste e sombreamento. É versátil e pode ser usado para uma ampla gama de assuntos.',
    img: blackAndGrayImg,
    value: 'black-and-gray',
    url: 'preto-e-cinza',
  },
  {
    name: 'New School',
    description:
      'As tatuagens neo-tradicionais se baseiam no estilo tradicional, mas incorporam elementos modernos como detalhes mais intrincados, cores vibrantes e proporções exageradas.',
    img: newchoolImg,
    value: 'new-school',
    url: 'new-school',
  },
  {
    name: 'Japonêsa/Irezumi',
    description:
      'Inspirado na arte tradicional japonesa, este estilo apresenta designs ousados e intrincados com motivos como dragões, carpas, cerejeiras e ondas. Frequentemente incorpora simbolismo e narrativas.',
    img: irezumiImg,
    value: 'irezumi',
    url: 'japonesa',
  },
  {
    name: 'Aquarela',
    description:
      'Tatuagens de aquarela imitam a qualidade fluida e translúcida das pinturas em aquarela. Elas frequentemente apresentam cores vibrantes e técnicas abstratas e pintadas.',
    img: waterColorImg,
    value: 'watercolor',
    url: 'aquarela',
  },
  {
    name: 'Geométrica',
    description:
      'Tatuagens geométricas utilizam formas e padrões geométricos para criar designs intrincados e visualmente impactantes. Este estilo pode variar de formas simples a composições complexas e simétricas.',
    img: geometricImg,
    value: 'geometric',
    url: 'geometrica',
  },
  {
    name: 'Pontilhismo',
    description:
      'Tatuagens de pontilhismo são criadas usando milhares de pequenos pontos para formar imagens e padrões. Técnicas de pontilhismo podem produzir gradientes sutis e texturas, resultando em designs únicos e visualmente atraentes.',
    img: dotworkImg,
    value: 'dotwork',
    url: 'pontilhismo',
  },
  {
    name: 'Minimalista',
    description:
      'Tatuagens de linhas finas apresentam linhas delicadas e mínimas e designs minimalistas. Elas podem ser usadas para tatuagens sutis e discretas ou peças de linhas intricadas.',
    img: finelineImg,
    value: 'fineline',
    url: 'minimalista',
  },
  {
    name: 'Tribal',
    description:
      'Tatuagens tribais se inspiram em culturas indígenas e apresentam designs ousados e pretos com padrões repetitivos e motivos simbólicos.',
    img: tribalImg,
    value: 'tribal',
    url: 'tribal',
  },
]

export default tattooStyles
