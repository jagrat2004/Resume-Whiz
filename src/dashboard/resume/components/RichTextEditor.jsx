import { useEffect, useState, useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import {
  BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic,
  BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline,
  Editor, EditorProvider, Toolbar, Separator
} from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT = 'position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue || '');
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.experience?.[index]?.title) {
      toast('Please Add Position Title');
      return;
    }

    setLoading(true);
    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

    const result = await AIChatSession.sendMessage(prompt);
    const resp = await result.response.text();
    const html = resp.replace('[', '').replace(']', '');

    setValue(html);
    onRichTextEditorChange({ target: { value: html } }); // propagate to parent
    setLoading(false);
  };

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? <LoaderCircle className='animate-spin' /> : <>
            <Brain className='h-4 w-4' /> Generate from AI
          </>}
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e) => {
          setValue(e.target.value);
          onRichTextEditorChange(e);
        }}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
