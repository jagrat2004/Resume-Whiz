import React, { useContext, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function ThemeColor() {
  // Removed duplicate "#FF5733"
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
    "#33FF71", "#3371FF", "#A1FF33", "#33A1FF",
    "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor || null);
  const { resumeId } = useParams();

  const onColorSelect = (color) => {
    if (!resumeId) {
      toast.error("Resume ID not found.");
      console.error("Missing resumeId");
      return;
    }

    setSelectedColor(color);
    setResumeInfo((prev) => ({
      ...prev,
      themeColor: color
    }));

    const data = {
      data: {
        themeColor: color
      }
    };

    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then((resp) => {
        console.log('✅ Theme color updated:', resp.data);
        toast.success('Theme color updated');
      })
      .catch((err) => {
        console.error('❌ Failed to update theme color:', err.response?.data || err.message);
        toast.error('Failed to update theme color');
      });
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          className="bg-white p-4 rounded-md shadow-md w-48"
          sideOffset={5}
        >
          <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
          <div className='grid grid-cols-5 gap-3'>
            {colors.map((item) => (
              <div
                key={item} // FIXED: use color code as unique key
                onClick={() => onColorSelect(item)}
                className={`h-5 w-5 rounded-full cursor-pointer border hover:border-black 
                  ${selectedColor === item ? 'border-2 border-black' : ''}`}
                style={{ background: item }}
                title={item}
              />
            ))}
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default ThemeColor;
