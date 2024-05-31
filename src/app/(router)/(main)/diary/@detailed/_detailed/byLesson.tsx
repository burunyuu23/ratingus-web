import React, { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SwiperRef, SwiperSlide } from "swiper/react";

import styles from "@/app/(router)/(main)/diary/@detailed/_detailed/ByDay.module.scss";
import { useGetLessonsByWeekQuery } from "@/entity/Lesson/query";
import LessonBlockDetailed from "@/entity/Lesson/ui/LessonBlockDetailed";
import Button from "@/shared/components/Button/Button";
import { Slider } from "@/shared/components/Slider/Slider";
import { Typography } from "@/shared/components/Typography/Typography";
import { getDateString, getDayAndMonth } from "@/shared/helpers/date";
import { addQueryInParamsString } from "@/shared/helpers/searchParams";
import { capitalize } from "@/shared/helpers/strings";

// import styles from './ByLesson.module.scss';

export type DetailedPageProps = {
  week: number;
  day: number;
  lesson: number;
};
const ByLesson = ({ week, day, lesson }: DetailedPageProps) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const handleBack = () => {
    router.push(
      path +
        `?${addQueryInParamsString(searchParams, { name: "lesson", value: undefined })}`,
    );
  };
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(
        studies.findIndex(({ timetableNumber }) => timetableNumber === lesson),
      );
    }
  }, [day, lesson]);

  const { data } = useGetLessonsByWeekQuery({
    week,
  });

  if (data === undefined) {
    return <div>loading...</div>;
  }

  const dayData = data[day - 1];
  const studies = dayData.studies;
  const study = studies.filter(
    ({ timetableNumber }) => timetableNumber === lesson,
  )[0];

  return (
    <div>
      <div className={styles.sliderHeader}>
        <Typography variant="h4">
          {capitalize(getDateString(dayData.dateTime, "dddd"))}
        </Typography>
        <Typography variant="h4">{getDayAndMonth(dayData.dateTime)}</Typography>
      </div>
      <div className={styles.sliderWrapper}>
        <Slider
          ref={swiperRef}
          className={styles.slider}
          swiperProps={{
            onSlideChange: (swiper) => {
              const lesson = studies[swiper.activeIndex].timetableNumber;
              router.push(
                path +
                  `?${addQueryInParamsString(searchParams, { name: "lesson", value: lesson })}`,
              );
            },
          }}
        >
          {dayData.studies.map((study) => (
            <SwiperSlide key={study.timetableNumber}>
              <div>
                <div className={styles.sliderContent}>
                  <Typography variant="small">
                    №{study.timetableNumber}
                  </Typography>
                  <Typography variant="small">8:00 - 8:40</Typography>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>
      <Button variant="ghost" onClick={handleBack}>
        <Typography color="textHelper">&lt; Назад</Typography>
      </Button>
      <div className={styles.lesson}>
        <LessonBlockDetailed key={study.timetableNumber} {...study} />
      </div>
    </div>
  );
};

export default ByLesson;
