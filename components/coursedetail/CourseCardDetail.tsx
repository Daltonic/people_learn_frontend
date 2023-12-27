"use client";
import React, { useEffect } from "react";
import { CourseStruct } from "@/utils/type.dt";
import Image from "next/image";
import Button from "../ReusableComponents/Button";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

interface ComponentProps {
  course: CourseStruct;
  index?: number;
}

const CourseCardDetail: React.FC<ComponentProps> = ({ course }) => {
  return (
    <div className="bg-white w-full md:w-[25%] md:right-10 md:top-0 md:absolute md:border border-[#EDEDED] p-2 space-y-2 mt-10 md:mt-0 rounded-md">
      <div className="relative flex justify-center items-center">
        <div >
          <Image
            width={250}
            height={250}
            style={{ height: "30%", width: "100%" }}
            className="rounded-md "
            src={course.imageSrc}
            alt="image"
          />
        </div>
        <div className="p-4 bg-[#C5165D] rounded-full absolute">
          {" "}
          <Image
            width={12}
            height={12}
            src="/images/instructors/icons/playwhite.svg"
            alt="icon"
          />
        </div>
      </div>
      <div className="px-2 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-2xl text-[#321463]">${course.discountedPrice}</p>
        <p className="text-sm text-[#4F547B] line-through">
          ${course.originalPrice}
        </p>
      </div>
     
      <div className="block space-y-2 ">
        <Button variant="pink" style={{ width: "100%" }}>
          Add To Cart
        </Button>
        <Button variant="pinkoutline" style={{ width: "100%" }}>
          Buy Now
        </Button>
      </div>
      <p className="text-[#4F547B] text-sm text-center">
        30-Day Money-Back Guarantee
      </p>

      <div>
        <div className="flex justify-between items-center border-b py-2 border-[#EDEDED]">
          <div className="flex gap-2 items-center">
            <Image
              width={5}
              height={5}
              className="rounded-md w-4 h-4"
              src="/images/cardInfo/video-file.svg"
              alt="image"
            />
            <p className="text-[#321463]">Lessons</p>
          </div>
          <p className="text-[#4F547B]">{course.lessonCount}</p>
        </div>
        <div className="flex justify-between items-center border-b py-2 border-[#EDEDED]">
          <div className="flex gap-2 items-center">
            <Image
              width={5}
              height={5}
              className="rounded-md w-4 h-4"
              src="/images/cardInfo/puzzle.svg"
              alt="image"
            />
            <p className="text-[#321463]">Quizzes</p>
          </div>
          <p className="text-[#4F547B]">{course.lessonCount}</p>
        </div>
        <div className="flex justify-between items-center border-b py-2 border-[#EDEDED]">
          <div className="flex gap-2 items-center">
            <Image
              width={5}
              height={5}
              className="rounded-md w-4 h-4"
              src="/images/cardInfo/clock.svg"
              alt="image"
            />
            <p className="text-[#321463]">Duration</p>
          </div>
          <p className="text-[#4F547B]">{course.lessonCount}</p>
        </div>
        <div className="flex justify-between items-center border-b py-2 border-[#EDEDED]">
          <div className="flex gap-2 items-center">
            <Image
              width={5}
              height={5}
              className="rounded-md w-4 h-4"
              src="/images/cardInfo/bar-chart.svg"
              alt="image"
            />
            <p className="text-[#321463]">Skill level</p>
          </div>
          <p className="text-[#4F547B]">{course.lessonCount}</p>
        </div>
        <div className="flex justify-between items-center border-b py-2 border-[#EDEDED]">
          <div className="flex gap-2 items-center">
            <Image
              width={5}
              height={5}
              className="rounded-md w-4 h-4"
              src="/images/cardInfo/translate.svg"
              alt="image"
            />
            <p className="text-[#321463]">Language</p>
          </div>
          <p className="text-[#4F547B]">{course.lessonCount}</p>
        </div>
        <div className="flex justify-between items-center border-b py-2 border-[#EDEDED]">
          <div className="flex gap-2 items-center">
            <Image
              width={5}
              height={5}
              className="rounded-md w-4 h-4"
              src="/images/cardInfo/badge.svg"
              alt="image"
            />
            <p className="text-[#321463]">Certificate</p>
          </div>
          <p className="text-[#4F547B]">{course.lessonCount}</p>
        </div>
        <div className="flex justify-between items-center border-b py-2 border-[#EDEDED]">
          <div className="flex gap-2 items-center">
            <Image
              width={5}
              height={5}
              className="rounded-md w-4 h-4"
              src="/images/cardInfo/infinity.svg"
              alt="image"
            />
            <p className="text-[#321463]">Full lifetime access</p>
          </div>
          <p className="text-[#4F547B]">{course.lessonCount}</p>
        </div>
        <div className="flex justify-center gap-2 items-center">
          <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
            <FaFacebookF />
          </div>
          <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
            <FaTwitter />
          </div>
          <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
            <FaInstagram />
          </div>
          <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
            <FaLinkedinIn />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CourseCardDetail;