import { ICardProps } from '../../types/props'

const Card: React.FC<ICardProps> = ({ el, index }) => {
  return (
    <div id={String(el.id)} className='repo'>
      <p>{index + 1})</p>
      <div className="">
        <p>Название репозитория: <span style={{fontWeight: 'bold'}}>{el.name}</span></p>
        {el.description && <p>Описание: <span style={{fontWeight: 'bold'}}>{el.description}</span></p>}
        <p>Звёзды: <span style={{fontWeight: 'bold'}}>{el.name}</span></p>
        <a href={el.clone_url}>Ссылка</a>
      </div>
    </div>
  )
}

export default Card
