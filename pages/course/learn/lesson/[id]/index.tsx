import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { ILesson } from "@/utils/type.dt";
import { fetchLesson } from "@/services/backend.services";
import LearnLesson from "@/components/coursedetail/lesson/LearnLesson";

const Page: NextPage<{ lessonData: ILesson }> = ({ lessonData }) => {
  return (
    <Layout>
      <div className="md:px-14 md:py-10 p-5 sm:px-10 md:relative overflow-x-hidden">
        <LearnLesson lesson={lessonData} />
      </div>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;
  const token = context.req.cookies.accessToken;

  try {
    const lesson = await fetchLesson(id as string, token);

    return {
      props: {
        lessonData: JSON.parse(JSON.stringify(lesson)) as ILesson,
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        lessonData: {} as ILesson,
      },
    };
  }
};