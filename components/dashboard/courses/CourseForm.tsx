import Badge from "@/components/reusableComponents/Badge";
import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import SelectField from "@/components/reusableComponents/SelectField";
import TextAreaField from "@/components/reusableComponents/TextAreaField";
import { useRouter } from "next/navigation";
import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  SyntheticEvent,
  useEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import { ICourse, RootState } from "@/utils/type.dt";
import WYSIWYG from "@/components/reusableComponents/WYSIWYG";
import { toast } from "react-toastify";
import { createCourse, updateCourse } from "@/services/backend.services";
import FileUploader from "@/components/reusableComponents/FileUploader";
import Image from "next/image";
import { uploaderActions } from "@/store/slices/uploaderSlice";
import { FaArrowsRotate, FaTrashCan } from "react-icons/fa6";

const CourseForm: React.FC<{ course?: ICourse; type: "create" | "update" }> = ({
  course,
  type,
}) => {
  const [editorContent, setEditorContent] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { setUploaderModal } = uploaderActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);

  const [productDetails, setProductDetails] = useState({
    name: course?.name || "",
    description: course?.description || "",
    overview: course?.overview || "",
    price: course?.price || 0,
    imageUrl: course?.imageUrl || "",
    difficulty:
      course?.difficulty ||
      ("Beginner" as "Beginner" | "Intermediate" | "Advanced"),
    productType: course?.type || ("Course" as "Course" | "Book"),
    tags: course?.tags ? course.tags.map((tag) => tag.name) : [],
    requirements: course?.requirements || ([] as string[]),
    highlights: course?.highlights || ([] as string[]),
  });

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: "tags" | "requirements" | "highlights"
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const input = e.target as HTMLInputElement;
      const value = input.value.trim();

      if (value !== "") {
        switch (field) {
          case "highlights":
            if (!productDetails.highlights.includes(value)) {
              setProductDetails((prev) => ({
                ...prev,
                highlights: [...prev.highlights, value],
              }));
              input.value = "";
            } else {
              input.value = "";
            }
            break;
          case "requirements":
            if (!productDetails.requirements.includes(value)) {
              setProductDetails((prev) => ({
                ...prev,
                requirements: [...prev.requirements, value],
              }));
              input.value = "";
            } else {
              input.value = "";
            }
            break;

          case "tags":
            if (!productDetails.tags.includes(value)) {
              setProductDetails((prev) => ({
                ...prev,
                tags: [...prev.tags, value],
              }));
              input.value = "";
            } else {
              input.value = "";
            }
            break;
        }
      }
    }
  };

  const handleRemoveItem = (
    field: "highlights" | "requirements" | "tags",
    value: string
  ) => {
    switch (field) {
      case "highlights":
        const newHighlights = productDetails.highlights.filter(
          (highlight: string) => highlight !== value
        );
        setProductDetails((prev) => ({ ...prev, highlights: newHighlights }));
        break;
      case "requirements":
        const newRequirements = productDetails.requirements.filter(
          (requirement: string) => requirement !== value
        );
        setProductDetails((prev) => ({
          ...prev,
          requirements: newRequirements,
        }));
        break;
      case "tags":
        const newTags = productDetails.tags.filter(
          (tag: string) => tag !== value
        );
        setProductDetails((prev) => ({ ...prev, tags: newTags }));
        break;
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageMount = (imageUrl: string) => {
    setProductDetails((prev) => ({
      ...prev,
      imageUrl,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (userData?.userType !== "instructor") {
      throw new Error("Only instructors can create products");
    }

    if (productDetails.price === 0) {
      toast.info("This is a free course");
      // return toast.warn(`Product price cannot be 0`);
    }

    setSubmitting(true);
    if (type === "create") {
      createProduct();
    } else {
      updateProduct();
    }
  };

  const createProduct = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await createCourse({
          name: productDetails.name,
          description: editorContent,
          overview: productDetails.overview,
          imageUrl: productDetails.imageUrl,
          price: Number(productDetails.price),
          difficulty: productDetails.difficulty,
          requirements: productDetails.requirements,
          tags: productDetails.tags,
          highlights: productDetails.highlights,
          type: productDetails.productType as "Book" | "Course",
        })
          .then((res) => {
            router.push("/(dashboard)/products/personal");
            setSubmitting(false);
            resetForm();
            resolve(res);
          })
          .catch((error) => {
            setSubmitting(false);
            reject(error);
          });
      }),
      {
        pending: `Saving your product...`,
        success: `Product saved successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  const updateProduct = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await updateCourse(
          {
            name: productDetails.name,
            description: editorContent,
            overview: productDetails.overview,
            imageUrl: productDetails.imageUrl,
            price: Number(productDetails.price),
            difficulty: productDetails.difficulty,
            requirements: productDetails.requirements,
            tags: productDetails.tags,
            highlights: productDetails.highlights,
            type: productDetails.productType as "Book" | "Course",
          },
          course?._id!
        )
          .then((res) => {
            router.push("/(dashboard)/products/personal");
            setSubmitting(false);
            resolve(res);
          })
          .catch((error) => {
            setSubmitting(false);
            reject(error);
          });
      }),
      {
        pending: `Saving your product...`,
        success: `Product saved successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  const resetForm = () => {
    setProductDetails({
      name: "",
      description: "",
      overview: "",
      price: 0,
      imageUrl: "",
      difficulty: "Beginner",
      productType: "Course",
      tags: [] as string[],
      requirements: [] as string[],
      highlights: [] as string[],
    });
  };

  return (
    <div className="bg-white rounded-lg ">
      <div className="p-5 border-b border-[#EDEDED]">
        {!productDetails.imageUrl && (
          <Button
            onClick={() => dispatch(setUploaderModal("scale-100"))}
            className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)]"
          >
            Add Image
          </Button>
        )}

        {productDetails.imageUrl && (
          <div className="relative w-full">
            <div className="flex justify-start items-center space-x-2 absolute top-2 left-2">
              <Button
                onClick={() => dispatch(setUploaderModal("scale-100"))}
                className="bg-black bg-opacity-25 text-white"
              >
                <FaArrowsRotate size={20} />
              </Button>

              <Button
                onClick={() =>
                  setProductDetails((prev) => ({ ...prev, imageUrl: "" }))
                }
                className="bg-black bg-opacity-25 text-white"
              >
                <FaTrashCan size={20} />
              </Button>
            </div>
            <Image
              src={productDetails.imageUrl}
              alt={productDetails.name || "Product"}
              width={500}
              height={100}
              className="h-72 w-full object-cover"
            />
          </div>
        )}
      </div>
      <form className="p-5" onSubmit={handleSubmit}>
        <InputField
          label="Name"
          name="name"
          placeholder="Enter your product name"
          required
          inputType="text"
          value={productDetails.name}
          handleChange={handleChange}
        />
        <div className="md:flex gap-8">
          <TextAreaField
            label="Overview"
            id="overview"
            name="overview"
            value={productDetails.overview}
            handleChange={handleChange}
          />
        </div>

        <div className="md:flex gap-8">
          <SelectField
            label="Difficulty"
            name="difficulty"
            options={[
              { label: "Beginner", value: "Beginner" },
              { label: "Intermediate", value: "Intermediate" },
              { label: "Advance", value: "Advanced" },
            ]}
            value={productDetails.difficulty}
            handleChange={handleChange}
          />

          <SelectField
            label="Product Type"
            name="productType"
            options={[
              { label: "Course", value: "Course" },
              { label: "Book", value: "Book" },
            ]}
            value={productDetails.productType}
            handleChange={handleChange}
          />
        </div>

        <div className="md:flex gap-8">
          <InputField
            label="Price"
            name="price"
            placeholder="Course Price"
            required
            inputType="number"
            value={productDetails.price}
            handleChange={handleChange}
          />
        </div>

        <div className="md:flex gap-8">
          <div className="flex flex-col gap-2 w-1/2">
            <InputField
              label="Product Requirements?"
              name="requirements"
              placeholder="Enter Product Requirements"
              required={false}
              inputType="text"
              handleKeyDown={(e) => handleInputKeyDown(e, "requirements")}
            />
            <div className="flex flex-wrap gap-2">
              {productDetails.requirements.map((requirement, index) => (
                <Badge
                  key={index}
                  inputText={requirement}
                  imageUrl="/images/general/cancel.png"
                  handleIconClick={() =>
                    handleRemoveItem("requirements", requirement)
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <InputField
              label="Tags"
              name="tags"
              placeholder="Enter Tags"
              required={false}
              inputType="text"
              handleKeyDown={(e) => handleInputKeyDown(e, "tags")}
            />
            <div className="flex flex-wrap gap-2">
              {productDetails.tags.map((tag, index) => (
                <Badge
                  key={index}
                  inputText={tag}
                  imageUrl="/images/general/cancel.png"
                  handleIconClick={() => handleRemoveItem("tags", tag)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <InputField
            label="What will students learn on your course?"
            name="highlights"
            placeholder="Enter Product Highlights"
            required={false}
            inputType="text"
            handleKeyDown={(e) => handleInputKeyDown(e, "highlights")}
          />
          <div className="flex flex-col gap-2">
            {productDetails.highlights.map((highlight, index) => (
              <Badge
                key={index}
                inputText={highlight}
                imageUrl="/images/general/cancel.png"
                handleIconClick={() =>
                  handleRemoveItem("highlights", highlight)
                }
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col my-3 relative">
          <WYSIWYG
            value={productDetails.description}
            handleChange={(content) => setEditorContent(content)}
          />
        </div>
        {type === "create" ? (
          <Button variant="pink" className="mt-4" disabled={submitting}>
            {submitting ? "Creating" : "Create"}
          </Button>
        ) : (
          <Button variant="pink" className="mt-4" disabled={submitting}>
            {submitting ? "Updating" : "Update"}
          </Button>
        )}
      </form>

      <FileUploader
        onUploadSuccess={(response) => handleImageMount(response.url)}
        accept="image/png,image/jpeg,image/jpg"
      />
    </div>
  );
};

export default CourseForm;
