import React from "react";
import Image from "next/image";
import { IAcademy } from "@/utils/type.dt";
import EmptyComponent from "../reusableComponents/EmptyComponent";
import Link from "next/link";

interface Props {
  academy: IAcademy;
  subscriptionId?: string;
}

const CoursesAccordion: React.FC<Props> = ({ academy, subscriptionId }) => {
  return (
    <div className="border rounded-md p-2 space-y-2 md:h-[55vh] overflow-y-scroll w-full">
      <div className="mb-2 text-[#9e6ded] text-lg font-medium ">
        Academy Courses
      </div>
      {academy.courses && academy.courses.length > 0 ? (
        <div className="flex flex-col gap-4">
          {academy.courses.map((course) => (
            <Link
              key={course._id}
              href={{
                pathname: `/course/learn/${course.slug}`,
                query: { sub: subscriptionId },
              }}
              className={`flex item-center gap-3 text-[#4F547B] md:text-sm p-2 rounded-sm cursor-pointer ${"bg-slate-50"}`}
            >
              <div>
                <Image
                  height={100}
                  width={100}
                  src={course.imageUrl || "/images/general/cardimg.svg"}
                  alt="Course Image"
                  className="w-14 h-10 object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium">{course.name}</h3>
                <p className="">Duration: {course.duration} mins</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyComponent
          title="No lessons available for this course"
          buttonText="Go Back"
        />
      )}
    </div>
  );
};

export default CoursesAccordion;
