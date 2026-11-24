import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper } from 'swiper/react';
import { Parallax, Scrollbar, Mousewheel, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/parallax';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

export interface HousingDesignCarouselProps {
  idPrefix: string;
  initialSlide?: number;
  activeSlideIndex: number;
  slideLabels: string[];
  onSwiper: (swiper: SwiperType) => void;
  onSlideChange: (index: number) => void;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  children: React.ReactNode;
}

export const HousingDesignCarousel: React.FC<HousingDesignCarouselProps> = ({
  idPrefix,
  initialSlide = 0,
  activeSlideIndex,
  slideLabels,
  onSwiper,
  onSlideChange,
  prevAriaLabel = 'Previous housing option',
  nextAriaLabel = 'Next housing option',
  children,
}) => {
  const prevSideClass = `${idPrefix}-side-prev`;
  const nextSideClass = `${idPrefix}-side-next`;
  const prevBtnClass = `${idPrefix}-swiper-prev`;
  const nextBtnClass = `${idPrefix}-swiper-next`;
  const scrollbarClass = `${idPrefix}-swiper-scrollbar`;

  return (
    <div className="relative">
      {/* Side Navigation Arrow - Previous */}
      <button
        type="button"
        className={`${prevSideClass} absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 border border-slate-300 text-[#0B192C] hover:bg-[#0B192C] hover:text-white hover:border-[#0B192C] transition-all shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer group disabled:opacity-30 disabled:pointer-events-none`}
        aria-label={prevAriaLabel}
      >
        <ChevronLeft className="w-6 h-6 stroke-[2.5] transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Side Navigation Arrow - Next */}
      <button
        type="button"
        className={`${nextSideClass} absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 border border-slate-300 text-[#0B192C] hover:bg-[#0B192C] hover:text-white hover:border-[#0B192C] transition-all shadow-xl hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer group disabled:opacity-30 disabled:pointer-events-none`}
        aria-label={nextAriaLabel}
      >
        <ChevronRight className="w-6 h-6 stroke-[2.5] transition-transform group-hover:translate-x-0.5" />
      </button>

      <Swiper
        modules={[Parallax, Scrollbar, Mousewheel, Navigation]}
        speed={600}
        parallax={true}
        watchSlidesProgress={true}
        rewind={true}
        centeredSlides={true}
        spaceBetween={20}
        slidesPerView={1}
        initialSlide={initialSlide}
        autoHeight={true}
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
        }}
        scrollbar={{
          draggable: true,
          el: `.${scrollbarClass}`,
        }}
        navigation={{
          prevEl: `.${prevSideClass}, .${prevBtnClass}`,
          nextEl: `.${nextSideClass}, .${nextBtnClass}`,
        }}
        onSwiper={onSwiper}
        onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
        className="w-full !pb-2 overflow-hidden rounded-2xl relative"
      >
        {/* Continuous Container Parallax Background Layer */}
        <div
          slot="container-start"
          className="parallax-bg pointer-events-none select-none z-0 overflow-hidden"
          data-swiper-parallax="-35%"
          data-swiper-parallax-duration="600"
        >
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(#94a3b8 1.5px, transparent 1.5px), linear-gradient(90deg, #94a3b8 1.5px, transparent 1.5px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {children}
      </Swiper>

      {/* Bottom Controls Bar: Centered Page Indicator & Scrollbar */}
      <div className="mt-4 flex items-center justify-center bg-white/80 backdrop-blur-sm border border-slate-200/80 p-3 sm:px-5 rounded-xl shadow-xs">
        <div className="w-full max-w-md flex flex-col gap-1.5">
          <div className={`${scrollbarClass} !relative !h-2 !bg-slate-200/70 rounded-full overflow-hidden cursor-pointer`} />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            {slideLabels.map((label, idx) => (
              <span key={label} className={activeSlideIndex === idx ? 'text-[#0B192C] font-bold' : ''}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .parallax-bg {
          position: absolute;
          left: 0;
          top: 0;
          width: 140%;
          height: 100%;
        }
        .${scrollbarClass} .swiper-scrollbar-drag {
          background: #0B192C !important;
          border-radius: 9999px !important;
          cursor: grab;
          transition: background-color 0.2s ease;
        }
        .${scrollbarClass} .swiper-scrollbar-drag:hover,
        .${scrollbarClass} .swiper-scrollbar-drag:active {
          background: #d97706 !important;
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
};
