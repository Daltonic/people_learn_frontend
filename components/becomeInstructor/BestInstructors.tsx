"use client";
import Link from "next/link";
import Button from "../ReusableComponents/Button";
import { GoArrowUpRight } from "react-icons/go";
import { teamMembers } from "../../data/instructors";
import InstructorCard from "./InstructorCard";

const BestInstructors: React.FC = () => {
  return (
    <div className="p-20">
      <div className="md:flex justify-between items-center w-full">
        <div className=" ">
          <h2 className="text-[#321463] font-bold text-3xl md:text-2xl">
            Learn from the best instructors
          </h2>
          <p className="text-[#4F547B] text-sm">
            Lorem ipsum dolor sit amet, consectetur.
          </p>
        </div>

        <div className="">
          <Link
            href="/instructor"
            className="font-medium text-sm text-center px-3 flex items-center rounded-md bg-[#6440FB12] hover:text-[#1A064F]  text-[#C5165D]-2 border-transparent hover:border-[#C5165D] hover:bg-transparent w-fit"
          >
            <Button className=""> View All instructors</Button>
            <GoArrowUpRight className="md:-ml-4 text-lg font-bold" />
            <i className="icon-arrow-top-right text-13 ml-10"></i>
          </Link>
        </div>
      </div>
      <div className="flex justify-between flex-wrap mt-10">
        {teamMembers.slice(0, 4).map((data, i: number) => (
          <InstructorCard data={data} key={i} />
        ))}
      </div>
    </div>
  );
};

export default BestInstructors;
