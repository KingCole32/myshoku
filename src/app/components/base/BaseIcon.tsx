import iconPathMap from "@/assets/iconPaths";

interface IconProps {
  name?: string;
  size?: string; // in px
  color?: string;
}

// simple handler for svg's to allow easier styling
const BaseIcon: React.FC<IconProps> = ({name = "file", size = "16", color = "white"}) => {
  const iconPath = iconPathMap.get(name)

  // NOTE: for some reason, tailwind's classes don't apply consistently, so stick with HTML colors and attr for now
  return (
    <i className="min-h-fit min-w-fit">
      {iconPath 
        ? // icon exists
          <svg height={`${size}`} fill={color} viewBox="0 0 24 24">
            <title>{name}</title>
            <path d={iconPath} />
          </svg>
        : // else error
          <span>Missing Icon</span>
      }
    </i>
  )
}

export default BaseIcon