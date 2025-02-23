import { ICardProps } from '../../types/props'

const Card: React.FC<ICardProps> = ({ el }) => {
  return (
    <div id={String(el.id)} >
      <p>Название репозитория: {el.name}</p>
      {el.description && <p>Описание: {el.description}</p>}
      <p>Звёзды: {el.stargazers_count}</p>
      <a href={el.clone_url}>Ссылка</a>
    </div>
  )
}

export default Card
