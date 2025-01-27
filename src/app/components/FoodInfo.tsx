import { useState } from "react";
import BaseIcon from "./base/BaseIcon"
import { FSPlace } from "@/types/Foursquare";
import LoadingIndicator from "./TheLoadingIndicator";
import ImagePreview from "./TheImagePreview";
import BaseRating from "./base/BaseRating";

type FoodInfoProps = {
  place?: FSPlace
}

const FoodInfo: React.FC<FoodInfoProps> = ({place}) => {
  const [currImageUrl, setCurrImageUrl] = useState("")
  const [isShowImagePrev, setIsShowImagePrev] = useState(false)
  const [currTipIndex, setCurrTipIndex] = useState(0)

  const goToTip = (forward: boolean) => {
    if (!place) return

    if (forward) {
      if (currTipIndex < place.tips.length-1) setCurrTipIndex(currTipIndex + 1)
        else setCurrTipIndex(0)
    } else {
      if (currTipIndex == 0) setCurrTipIndex(place.tips.length-1)
      else setCurrTipIndex(currTipIndex - 1)
    }
  }

  if (place) return (
    <div className="flex flex-col h-fit w-full overflow-scroll rounded-md">
      {/* images container */}
      {place.photos.length > 0 &&
        <div className="flex flex-row w-full h-1/3 m-h-1/3 bg-main rounded-md pb-5">
          <div className="flex flex-row max-h-1/3 max-w-5/6 overflow-y-scroll rounded-md">
            {place.photos.map((image, index) => (
              <img 
                className={"h-full bg-white" + (index != 0 ? " pl-2":"")} 
                src={`${image.prefix}cap400${image.suffix}`}
                alt={"RestaurantImage" + index}
                key={"RestaurantImage" + index} 
                onClick={ () => {
                  setCurrImageUrl(`${image.prefix}original${image.suffix}`)
                  setIsShowImagePrev(true)
                }}
              />
            ))}
          </div>
          <ImagePreview display={isShowImagePrev} imgUrl={currImageUrl} callBackFunc={setIsShowImagePrev}></ImagePreview>
        </div>
      }

      {/* basic info as a glance */}
      <div className="flex flex-col items-center justify-center h-fit w-full pb-5">
        <div className="h-fit w-fit font-bold text-3xl">{place.name}</div>
        <div className="h-fit">{(place.categories.flatMap(cat => cat.name).join(", "))}</div>
        <div className="flex h-fit w-fit">
          {place.rating && <BaseRating score={Math.round(place.rating/2)} max={5} color="orange-300" character="★"/>}
          {place.price && <BaseRating score={place.price} max={4} color="green-600" character="$" classExtra="font-bold tracking-[.25em] ml-1"/>}
          <div className="flex items-center w-fit h-fit border-2 border-slate-900 rounded-full px-1 ml-1">
            <BaseIcon name="walk" size="20" color="black"></BaseIcon> 
            <span className="pl-1">
              {`~${Math.floor(place.distance/80)}min`}
            </span>
          </div>
        </div>
      </div>
      
      {/* user comments */}
      {place.tips.length > 0 &&
        <div className="flex flex-col h-fit w-full bg-secondary rounded-md p-2 mb-1">
          <div className="font-bold text-white pb-1">What others are saying:</div>
          <div className="flex items-end w-full h-fit pl-4 pb-1">
            <div className="h-fit w-full text-center text-pretty bg-white rounded-tl-lg rounded-r-lg p-2 ml-2">
              {place.tips[currTipIndex].text}
            </div>
          </div>
          <div className="flex h-fit w-full">
            <BaseIcon name="users" size="26" color="var(--color-primary)"></BaseIcon>
            <span className="flex justify-center h-fit w-full">
              <button className="w-fit bg-primary rounded-full p-1/2 mr-6" onClick={() => goToTip(true)}>
                <BaseIcon name="left" size="24" color="white"></BaseIcon>
              </button>
              <button className="w-fit bg-primary rounded-full p-1/2" onClick={() => goToTip(false)}>
                <BaseIcon name="right" size="24" color="white"></BaseIcon>
              </button>
            </span>
          </div>
        </div>
        
      }

      <div className="flex flex-col items-start w-full h-fit bg-primary rounded-md px-2 pt-3 pb-2">
        {place.menu &&
          <button
            title="Open site in a new tab"
            className="flex items-center bg-white border border-slate-200 rounded-full mb-2 py-1 px-2"
            onClick={() => window.open(place.menu, "_blank")}
          >
            <BaseIcon name="silverware" size="24" color="black"></BaseIcon>
            <span className="pl-1">{place.menu}</span>
          </button>
        }
        <button
          title="Copy address"
          className="flex items-center bg-white border border-slate-200 rounded-full mb-2 py-1 px-2"
          onClick={() => {navigator.clipboard.writeText(`${place.location.address_extended}, ${place.location.formatted_address}`)}}
        >
          <span className="min-w-fit"><BaseIcon name="location" size="24" color="black"></BaseIcon></span>
          <span className="pl-1">{`
            ${place.location.address_extended? place.location.address_extended + ", " : ""}
            ${place.location.formatted_address}`}</span>
        </button>
        <div className="flex items-center bg-white border border-slate-200 rounded-full mb-2 py-1 px-2">
          <BaseIcon name="hours" size="24" color="black"></BaseIcon> 
          <span className="pl-1">
            {place.hours.display}
          </span>
        </div>
        <button
          title="Copy telephone number"
          className="flex items-center bg-white border border-slate-200 rounded-full mb-2 py-1 px-2"
          onClick={() => {navigator.clipboard.writeText(place.tel)}}
        >
          <BaseIcon name="call" size="24" color="black"></BaseIcon> 
          <span className="pl-1">
            {place.tel}
          </span>
        </button>
        {place.website && 
          <button
            title="Open site in a new tab"
            className="flex items-center bg-white border border-slate-200 rounded-full mb-2 py-1 px-2"
            onClick={() => window.open(place.website, "_blank")}
          >
            <BaseIcon name="home" size="24" color="black"></BaseIcon> 
            <span className="pl-1">
              {place.website}
            </span>
          </button>
        }
        {place.social_media.facebook_id &&
          <button
            title="Open site in a new tab"
            className="flex items-center bg-white border border-slate-200 rounded-full mb-2 py-1 px-2"
            onClick={() => window.open(`https://facebook.com/profile.php?id=${place.social_media.facebook_id}`, "_blank")}
          >
            <BaseIcon name="facebook" size="24" color="#1877F2"></BaseIcon>
            <span className="pl-1">
              {place.social_media.facebook_id}
            </span>
          </button>
        }
        {place.social_media.instagram &&
          <button
            title="Open site in a new tab"
            className="flex items-center bg-white border border-slate-200 rounded-full mb-2 py-1 px-2"
            onClick={() => window.open(`https://instagram.com/${place.social_media.instagram}`, "_blank")}
          >
            <span className="h-fit w-fit rounded-lg bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-1">
              <BaseIcon name="instagram" size="18" color="white"></BaseIcon>
            </span>
            <span className="pl-1">
              {place.social_media.instagram}
            </span>
          </button>
        }
        {place.social_media.twitter &&
          <button
            title="Open site in a new tab"
            className="flex items-center bg-white border border-slate-200 rounded-full mb-2 py-1 px-2"
            onClick={() => window.open(`https://x.com/${place.social_media.twitter}`, "_blank")}
          >
            <span className="h-fit w-fit bg-black rounded-full p-1">
              <BaseIcon name="twitter-x" size="15" color="white"></BaseIcon>
            </span>
            <span className="pl-1">
              {place.social_media.twitter}
            </span>
          </button>
        }

        {/* associated keywords, aka "tastes" */}
        {place.tastes && place.tastes.length > 0 &&
          <div className="flex flex-col h-fit w-full bg-white border border-slate-200 rounded-lg p-2 mt-1">
            <span className="font-bold">Keywords: </span>
            <div className="flex flex-wrap">{
              place.tastes.map((taste, index) => {
                return (
                  <div className="w-fit h-fit bg-slate-100 shadow-inner border border-slate rounded-lg py-1 px-2 ml-2 mb-2" key={"keyword" + index}>{taste}</div>
                )
              })
            }</div>
          </div>
        }
      </div>
    </div>
  )
  else return (
    <LoadingIndicator color="white"></LoadingIndicator>
  )
}

export default FoodInfo