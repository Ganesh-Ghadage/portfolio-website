import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectInterface } from '@/shared/interface.ts';
import GalleryModal from './ui/image-modal.tsx'
import { useRef, useState } from "react";

function ProjectCard({project} : {project: ProjectInterface}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const descRef = useRef<HTMLParagraphElement>(null)
  const [isShowingMore, setIsShowingMore] = useState<boolean>(false);
  
  const toggleIsShowingMore = () => setIsShowingMore(prev => !prev);

  return (
      <div className='h-fit w-full bg-[#ffffff5d] dark:bg-[#0a0a0a5d] border border-transparent dark:border-neutral-800 relative z-50 flex flex-col flex-1 overflow-hidden'>
          <div className='flex flex-col '>
            <h4 className="flex flex-col gap-2 items-center text-primary bg-[#f3f4f65d] dark:bg-[#1717175d] p-4 font-bold text-center mb-8">
              <span className="md:text-xl w-fit px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                {project.title}
              </span>
              <span className='text-sm md:text-lg'>
                {project.desciption.title}
              </span>
            </h4>
            <div>
            {selectedImage ? (
                    <GalleryModal
                        selectedImage={selectedImage}
                        isOpen={true}
                        onClose={() => setSelectedImage(null)}
                        setSelectedItem={setSelectedImage}
                    />
                ) : (
              <div className="flex justify-center items-center">
                {project.images && project.images.map((image, idx) => (
                  <motion.div
                    key={"images" + idx}
                    style={{
                      rotate: Math.random() * 20 - 10,
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    whileTap={{
                      scale: 1.1,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    className="rounded-xl -mr-4 mb-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-400 flex-shrink-0 overflow-hidden"
                  >
                    <img
                      src={image}
                      alt="project images"
                      width="500"
                      height="500"
                      onClick={() => setSelectedImage(image)}
                      className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                    />
                  </motion.div>
                ))}
              </div>
              )}
            </div>
            <div className={`p-4 flex flex-col gap-y-2 text-primary mx-auto ${!isShowingMore ? 'h-fit' : 'h-[50vh] md:h-fit overflow-y-auto scrollbar-hidden'} `}>
              <div ref={descRef} className={`break-words text-start gap-y-1 text-sm ${!isShowingMore && 'line-clamp-3'}`}>
                { project.desciption.point.map((pnt, idx) => (
                  <p key={idx}>{`> ${pnt}`}</p>))
                }
              </div>
              <button onClick={toggleIsShowingMore} className="text-blue-600 text-end hover:text-blue-800">
                {isShowingMore ? 'Show less ⩓' : 'Show more ⩔'}
              </button>
            </div>
          </div>
          <div className={`gap-4 flex ${project.link ? "justify-between" : "justify-end" } p-4 bg-[#f3f4f65d] dark:bg-[#1717175d]`}>
            {project.link && <Button
              variant="secondary"
              className="w-28 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300"
            >
              <a href={project.link} target='_blank'>Live Demo</a>
            </Button>}
            <Button
              variant="default"
              className="w-28 bg-black text-white dark:bg-white dark:text-black border border-black"
            >
              <a href={project.gitLink} target='_blank'>GitHub Repo</a>
            </Button>
          </div>
    </div>
  )
}

export default ProjectCard
