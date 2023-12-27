import DashBoardHeader from "@/components/dashboard/dashboardLayout/DashBoardHeader";
import DashBoardSidebar from "@/components/dashboard/dashboardLayout/DashBoardSidebar";
import React, { useState } from "react";
import MyCourses from "@/components/dashboard/courses/MyCourses";

const Courses: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-white">
      <DashBoardHeader />
      <div className="flex justify-between md:pr-5">
        <DashBoardSidebar isOpen={sidebarOpen}   />
        <main className="flex-1 bg-[#F7F8FB] p-5 md:px-10 md:py-16 md:rounded-xl">
          <MyCourses/>
        </main>
      </div>
    </div>
  );
};

export default Courses;
