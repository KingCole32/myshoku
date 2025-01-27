import { Dispatch, SetStateAction } from "react"
import BaseIcon from "./base/BaseIcon"


type ImagePrevProps = {
  display: boolean,
  imgUrl: string,
  callBackFunc: Dispatch<SetStateAction<boolean>>
}

const ImagePreview: React.FC<ImagePrevProps> = ({display, imgUrl, callBackFunc}) => {
  const handleClick = () => {
    callBackFunc(false)
  }

  if (display) return(
    <div className="flex items-center justify-center fixed top-0 left-0 z-[9999] h-100vh w-100vw bg-slate-500/50" onClick={handleClick}>
      <div className="relative h-90vh w-fit bg-white border-4 border-primary rounded-lg shadow-lg overflow-hidden">
        <button className="absolute top-5 right-5 w-fit h-fit bg-primary rounded-full" onClick={handleClick}>
          <BaseIcon name="close" size="24" color="white"></BaseIcon>
        </button>
        <img className="h-full" height="100%" src={imgUrl} alt="Preview Image" />
      </div>
    </div>
  )
}

export default ImagePreview