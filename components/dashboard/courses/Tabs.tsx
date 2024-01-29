"use client";
import React, { useEffect, useState } from "react";
import MyCourseCard from "./MyCourseCard";
import { coursesData } from "@/data/courses";
import SearchAndFilterBar from "@/components/reusableComponents/SearchAndFilterBar";
import { _useContext } from "@/context/Context";
import EmptyComponent from "@/components/reusableComponents/EmptyComponent";

const Tabs: React.FC = () => {
  const { user, setUser } = _useContext();
  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
    if (!user) {
      setUser(sessionUser);
    }
  }, [setUser, user]);
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="">
        <SearchAndFilterBar />
        <div className="flex space-x-5 border-b">
          <button
            onClick={() => handleTabClick(1)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 1
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            All Courses
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 2
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Finished
          </button>
          <button
            onClick={() => handleTabClick(3)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 3
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Not enrolled
          </button>
        </div>

        <div className="py-4 text-[#4F547B]">
          {activeTab === 1 && (
            <div className="flex justify-between  w-full flex-wrap">
            {coursesData.map((elm, i: number) => (
                <MyCourseCard data={elm} index={i} key={i} />
              ))}
          </div>
          )}
          {/* {activeTab === 2 && (
            <div className="flex justify-between  w-full flex-wrap">
              {coursesData.length > 0 ? (
                coursesData.map((elm, i: number) => (
                  <MyCourseCard data={elm} index={i} key={i} />
                ))
              ) : (
                <EmptyComponent
                  title="No Courses Available"
                  buttonText="Create One Now"
                />
              )}
            </div>
          )}
          {activeTab === 3 && (
            <div className="flex justify-between w-full flex-wrap">
              {coursesData.length > 0 ? (
                coursesData.map((elm, i: number) => (
                  <MyCourseCard data={elm} index={i} key={i} />
                ))
              ) : (
                <EmptyComponent
                  title="No Courses Available"
                  buttonText="Create One Now"
                />
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
