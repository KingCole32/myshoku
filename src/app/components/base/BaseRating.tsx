
type RatingProps = {
  score: number,
  max: number,
  color?: string,
  classExtra?: string,
  character?: string,
  // TODO: add support for svg's later
}

const BaseRating: React.FC<RatingProps> = ({score, max, color="black", classExtra="", character="●"}) => {
  return (
    <div className={`h-fit w-fit h-fit border-2 border-${color} rounded-full px-1 ${classExtra}`}>
      <span className={`text-${color}`}>{ Array.from({ length: score }).map(() => character) }</span>
      <span className="text-slate-300">{ Array.from({ length: max - score }).map(() => character) }</span>
    </div>
  )
}

export default BaseRating