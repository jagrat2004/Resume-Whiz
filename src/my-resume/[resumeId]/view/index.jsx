import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';

function ViewResume() {

  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then(resp => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  const shareUrl = `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`;
  const shareText = `Hello Everyone, This is my resume. Please open the URL to see it`;

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>
            Congrats! Your Ultimate AI-generated Resume is ready!
          </h2>
          <p className='text-center text-gray-400'>
            Now you are ready to download your resume and share the unique resume URL with your friends and family.
          </p>

          <div className='flex justify-between px-44 my-10 gap-4 flex-wrap'>
            <Button onClick={HandleDownload}>Download</Button>

            {/* Share Buttons */}
            <FacebookShareButton url={shareUrl} quote={shareText}>
              <Button>Share on Facebook</Button>
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl} title={shareText}>
              <Button>Share on Twitter</Button>
            </TwitterShareButton>

            <LinkedinShareButton url={shareUrl} title={shareText}>
              <Button>Share on LinkedIn</Button>
            </LinkedinShareButton>

            <WhatsappShareButton url={shareUrl} title={shareText}>
              <Button>Share on WhatsApp</Button>
            </WhatsappShareButton>
          </div>
        </div>
      </div>

      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
