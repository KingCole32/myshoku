"use client"

import BaseIcon from "@/app/components/base/BaseIcon";

const TheNavigation = () => {
  return (
    <>
      <header className="flex h-10vh w-full items-center justify-between bg-primary p-5 navigation">
        {/* left side (logo area) */}
        <span className="flex items-center justify-center">
          <h1 className="text-2xl font-extrabold tracking-tighter scale-y-150">
            MyShoku
          </h1>
          {/* hover:bg-sky-700 */}
          <BaseIcon size="28" name="food" color="white"/>
        </span>

        {/* right side (function area) */}
        <span className="flex items-center justify-center">
          {/* enable when i18n is added */}
          {/* <button>
            <BaseIcon size="30" name="globe" color="white"/>
          </button> */}

          {/* enable once there are options to edit */}
          {/* <button>
            <BaseIcon size="30" name="cog" color="white"/>
          </button> */}
        </span>
      </header>

      <style lang="css">{`
        .navigation {
          height: 10vh;
          width: 100vw;
        }
      `}</style>
    </>
  )
}

export default TheNavigation