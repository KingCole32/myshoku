import BaseIcon from "./base/BaseIcon"

type LoadingProps = {
  color: string;
}

const LoadingIndicator: React.FC<LoadingProps> = ({color="white"}) => {
  return (
    <>
      <div className="flex items-center justify-center h-full w-full">
        <div className="h-fit w-fit loading_anim">
          <BaseIcon size="32" name="hourglass" color={color}></BaseIcon>
        </div>
      </div>


      <style lang="css">{`
        .loading_anim {
          animation: loadingAnim 1.5s infinite alternate ease-in-out;
        }

        @keyframes loadingAnim {
          from {transform: rotate(-50deg);}
          to {transform: rotate(50deg);}
        }
      `}</style>
    </>
  )
}

export default LoadingIndicator