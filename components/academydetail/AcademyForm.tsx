import Badge from '@/components/reusableComponents/Badge'
import Button from '@/components/reusableComponents/Button'
import InputField from '@/components/reusableComponents/InputField'
import SelectField from '@/components/reusableComponents/SelectField'
import TextAreaField from '@/components/reusableComponents/TextAreaField'
import { IAcademy, RootState } from '@/utils/type.dt'
import { useRouter } from 'next/navigation'
import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  SyntheticEvent,
  useEffect,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '@/store/slices/userSlice'
import { toast } from 'react-toastify'
import WYSIWYG from '../reusableComponents/WYSIWYG'
import { createAcademy, updateAcademy } from '@/services/backend.services'
import FileUploader from '../reusableComponents/FileUploader'
import { FaArrowsRotate, FaTrashCan } from 'react-icons/fa6'
import Image from 'next/image'
import { uploaderActions } from '@/store/slices/uploaderSlice'

interface AcademyProps {
  academy?: IAcademy
  type: 'create' | 'update'
}

const AcademyForm: React.FC<AcademyProps> = ({ academy, type }) => {
  const [editorContent, setEditorContent] = useState<string>('')
  const router = useRouter()
  const dispatch = useDispatch()
  const { setUserData } = userActions
  const { userData } = useSelector((states: RootState) => states.userStates)
  const [imageUrl, setImageUrl] = useState<string | null>(
    academy?.imageUrl || null
  )

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem('user')!)
      if (sessionUser) {
        dispatch(setUserData(sessionUser))
      }
    }
  }, [dispatch, setUserData, userData])
  const [academyDetails, setAcademyDetails] = useState({
    title: academy?.name || '',
    description: academy?.description || '',
    overview: academy?.overview || '',
    price: academy?.price || 0,
    validity: academy?.validity || 0,
    imageUrl: academy?.imageUrl || '',
    difficulty:
      academy?.difficulty ||
      ('Beginner' as 'Beginner' | 'Intermediate' | 'Advanced'),
    tags: academy?.tags ? academy.tags.map((tag) => tag.name) : [],
    requirements: academy?.requirements ? academy.requirements : [],
    highlights: academy?.highlights ? academy.highlights : [],
  })
  const { setUploaderModal } = uploaderActions

  const [submitting, setSubmitting] = useState<boolean>(false)

  const handleInputKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    field: 'tags' | 'requirements' | 'highlights'
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      const input = e.target as HTMLInputElement
      const value = input.value.trim()

      if (value !== '') {
        switch (field) {
          case 'highlights':
            if (!academyDetails.highlights.includes(value)) {
              setAcademyDetails((prev) => ({
                ...prev,
                highlights: [...prev.highlights, value],
              }))
              input.value = ''
            } else {
              input.value = ''
            }
            break
          case 'requirements':
            if (!academyDetails.requirements.includes(value)) {
              setAcademyDetails((prev) => ({
                ...prev,
                requirements: [...prev.requirements, value],
              }))
              input.value = ''
            } else {
              input.value = ''
            }
            break

          case 'tags':
            if (!academyDetails.tags.includes(value)) {
              setAcademyDetails((prev) => ({
                ...prev,
                tags: [...prev.tags, value],
              }))
              input.value = ''
            } else {
              input.value = ''
            }
            break
        }
      }
    }
  }

  const handleRemoveItem = (
    field: 'highlights' | 'requirements' | 'tags',
    value: string
  ) => {
    switch (field) {
      case 'highlights':
        const newHighlights = academyDetails.highlights.filter(
          (highlight: string) => highlight !== value
        )
        setAcademyDetails((prev) => ({ ...prev, highlights: newHighlights }))
        break
      case 'requirements':
        const newRequirements = academyDetails.requirements.filter(
          (requirement: string) => requirement !== value
        )
        setAcademyDetails((prev) => ({
          ...prev,
          requirements: newRequirements,
        }))
        break
      case 'tags':
        const newTags = academyDetails.tags.filter(
          (tag: string) => tag !== value
        )
        setAcademyDetails((prev) => ({ ...prev, tags: newTags }))
        break
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget

    setAcademyDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageMount = (imageUrl: string) => {
    setAcademyDetails((prev) => ({
      ...prev,
      imageUrl,
    }))
    setImageUrl(imageUrl)
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (
      userData?.userType !== 'instructor' &&
      String(userData?._id) === String(academy?.userId._id)
    ) {
      return toast.warn(`Only instructors can create products`)
    }

    if (academyDetails.price === 0) {
      return toast.warn(`Academy price cannot be 0`)
    }

    setSubmitting(true)

    const academyInput = {
      ...academyDetails,
      name: academyDetails.title,
      description: editorContent,
      price: Number(academyDetails.price),
      validity: Number(academyDetails.validity),
    }

    if (type === 'create') {
      await toast.promise(
        new Promise<void>((resolve, reject) => {
          createAcademy(academyInput)
            .then((result) => {
              router.push('/(dashboard)/products/personal')
              setSubmitting(false)
              resolve(result)
            })
            .catch((error) => {
              setSubmitting(false)
              reject(error)
            })
        }),
        {
          pending: 'Creating Academy...',
          success: 'Successfully created 👌',
          error: 'Encountered error 🤯',
        }
      )
    } else {
      await toast.promise(
        new Promise<void>((resolve, reject) => {
          updateAcademy(academyInput, String(academy?._id!))
            .then((result) => {
              router.push('/(dashboard)/products/personal')
              setSubmitting(false)
              resolve(result)
            })
            .catch((error) => {
              setSubmitting(false)
              reject(error)
            })
        }),
        {
          pending: 'Updating Academy...',
          success: 'Successfully updated 👌',
          error: 'Encountered error 🤯',
        }
      )
    }
  }

  return (
    <div className="bg-white rounded-lg ">
      <div className="p-5 border-b border-[#EDEDED]">
        {!academyDetails.imageUrl && (
          <Button
            onClick={() => dispatch(setUploaderModal('scale-100'))}
            className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)]"
          >
            Add Image
          </Button>
        )}

        {imageUrl && (
          <div className="relative w-full">
            <div className="flex justify-start items-center space-x-2 absolute top-2 left-2">
              <Button
                onClick={() => dispatch(setUploaderModal('scale-100'))}
                className="bg-black bg-opacity-25 text-white"
              >
                <FaArrowsRotate size={20} />
              </Button>

              <Button
                onClick={() =>
                  setAcademyDetails((prev) => ({ ...prev, imageUrl: '' }))
                }
                className="bg-black bg-opacity-25 text-white"
              >
                <FaTrashCan size={20} />
              </Button>
            </div>
            <Image
              src={academyDetails.imageUrl}
              alt={academyDetails.title || 'Product'}
              width={500}
              height={100}
              className="h-72 w-full object-cover"
            />
          </div>
        )}
      </div>
      <form className="p-5" onSubmit={handleSubmit}>
        <InputField
          label="Title"
          name="title"
          placeholder="Academy title"
          required
          inputType="text"
          value={academyDetails.title}
          handleChange={handleChange}
        />
        <div className="md:flex gap-8">
          <TextAreaField
            label="Overview"
            id="overview"
            name="overview"
            placeholder="Academy Overview"
            value={academyDetails.overview}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <InputField
            label="Price"
            name="price"
            placeholder="Academy Price"
            required
            inputType="number"
            value={academyDetails.price}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <SelectField
            label="Difficulty"
            name="difficulty"
            options={[
              { label: 'Beginner', value: 'Beginner' },
              { label: 'Intermediate', value: 'Intermediate' },
              { label: 'Advance', value: 'Advanced' },
            ]}
            value={academyDetails.difficulty}
            handleChange={handleChange}
          />

          <SelectField
            label="Validity"
            name="validity"
            options={[
              { label: 'One-Off', value: 0 },
              { label: 'Monthly', value: 1 },
              { label: 'Quarterly', value: 3 },
              { label: 'Bi-Anually', value: 6 },
              { label: 'Annually', value: 12 },
            ]}
            value={academyDetails.validity}
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
              handleKeyDown={(e) => handleInputKeyDown(e, 'requirements')}
            />
            <div className="flex flex-wrap w-full gap-2">
              {academyDetails.requirements.map((requirement, index) => (
                <Badge
                  key={index}
                  inputText={requirement}
                  imageUrl="/images/general/cancel.png"
                  handleIconClick={() =>
                    handleRemoveItem('requirements', requirement)
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <InputField
              label="Enter suitable tags"
              name="tags"
              placeholder="Enter Tags"
              required={false}
              inputType="text"
              handleKeyDown={(e) => handleInputKeyDown(e, 'tags')}
            />
            <div className="flex flex-wrap w-full gap-2">
              {academyDetails.tags.map((tag, index) => (
                <Badge
                  key={index}
                  inputText={tag}
                  imageUrl="/images/general/cancel.png"
                  handleIconClick={() => handleRemoveItem('tags', tag)}
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
            handleKeyDown={(e) => handleInputKeyDown(e, 'highlights')}
          />
          <div className="flex flex-col gap-2 w-full">
            {academyDetails.highlights.map((highlight, index) => (
              <Badge
                key={index}
                inputText={highlight}
                imageUrl="/images/general/cancel.png"
                handleIconClick={() =>
                  handleRemoveItem('highlights', highlight)
                }
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full my-3 relative">
          <WYSIWYG
            value={academyDetails.description}
            handleChange={(content) => setEditorContent(content)}
          />
        </div>

        {type === 'create' ? (
          <Button variant="pink" className="mt-14" disabled={submitting}>
            {submitting ? 'Creating' : 'Create'}
          </Button>
        ) : (
          <Button variant="pink" className="mt-14" disabled={submitting}>
            {submitting ? 'Updating' : 'Update'}
          </Button>
        )}
      </form>
      <FileUploader
        onUploadSuccess={(response) => handleImageMount(response.url)}
        accept="image/png,image/jpeg,image/jpg"
      />
    </div>
  )
}

export default AcademyForm
