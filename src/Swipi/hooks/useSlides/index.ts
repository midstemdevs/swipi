import { useState, useMemo } from 'react'
import { ConfigService } from '../../configService'
import {
  addUniqueId,
  isShowArrowsFn,
  returnSlideWidth,
  setKeyToChildren
} from '../../helpers'
import { cloneArray } from '../../../helpers'
import { reduceSlide } from '../../constants'
import { Slides } from './types'

export const useSlides = ({
  endX,
  startX,
  config,
  movePath,
  children,
  showArrows,
  currentRef,
  windowWidth,
  slidesNumber,
  slidesAnimation,
  spaceBetweenSlides,
  setMovePath,
}: Slides) => {
  const [transform, setTransform] = useState<number>(0)

  const { returnSpaceBetween, getSwipiUpdatesParam, getRightSlidesCount } =
    ConfigService(config, windowWidth)

  const visibleCountSlides = getRightSlidesCount(slidesNumber, slidesAnimation)
  const spaceBetween = returnSpaceBetween(spaceBetweenSlides)
  const isShowArrows = isShowArrowsFn(children, visibleCountSlides, showArrows)
  const isCornerSlide = !!getSwipiUpdatesParam('biasRight')

  const currentRefWidth = currentRef?.clientWidth

  const updateSlideWidthArgs = useMemo(
    () => ({
      visibleCountSlides,
      spaceBetween,
      current: currentRefWidth
    }),
    [spaceBetween, visibleCountSlides, currentRefWidth]
  )

  const slideWidth = useMemo(
    () =>
      isCornerSlide
        ? returnSlideWidth(updateSlideWidthArgs) * reduceSlide
        : returnSlideWidth(updateSlideWidthArgs),
    [isCornerSlide, updateSlideWidthArgs]
  )

  const slides = useMemo(() => {
    return isShowArrows
      ? addUniqueId(cloneArray(setKeyToChildren(children), 3))
      : addUniqueId(setKeyToChildren(children))
  }, [isShowArrows, children])

  const startTransform = -slideWidth * children.length

  const checkAreaBeyondSwipi = (): boolean =>
    transform <= startTransform * 2 - slideWidth || transform >= slideWidth / 2

  const moveSlides = (): void => {
    const pathTaken = endX && startX - endX
    setTransform((prev) => prev - pathTaken + movePath)
    setMovePath(pathTaken)
  }

  const jumpToTheLastSlide = (): void => {
    const lineLengthOfSlides = slideWidth * slides.length
    const numberOfSlidesBack = visibleCountSlides === 1 ? 2 : visibleCountSlides
    const rightJump = -(lineLengthOfSlides - slideWidth * numberOfSlidesBack)
    setTransform(movePath > 0 ? rightJump : 0)
  }

  return {
    slides,
    transform,
    slideWidth,
    isShowArrows,
    spaceBetween,
    startTransform,
    moveSlides,
    setTransform,
    jumpToTheLastSlide,
    checkAreaBeyondSwipi,
  }
}