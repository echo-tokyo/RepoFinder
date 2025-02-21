import { ICardProps } from '../types/props'

const Card:React.FC<ICardProps> = ({el}) => {
  return (
    <div>
      {el.name}
    </div>
  )
}

export default Card