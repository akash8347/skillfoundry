import { getDayContent } from "../../../lib/getDayContent";
import { MDXRemote } from 'next-mdx-remote/rsc';
import Tip from "@/lib/myComponents/Tip";
import Task from "@/lib/myComponents/Task";
import Divider from "@/lib/myComponents/Divider";
import Table from "@/lib/myComponents/Tables";

import CodeBlock from "@/lib/myComponents/CodeBlock";
import InfoBox from "@/lib/myComponents/InfoBox";
import Warning from "@/lib/myComponents/Warning";
import Note from "@/lib/myComponents/Note";
import BrowserMockup from "@/lib/myComponents/BrowserMockup";
import HtmlCssPlayground from "@/lib/myComponents/HtmlCssPlayground ";
import HtmlPlayground from "@/lib/myComponents/HtmlPlayground ";
import HtmlCssJsPlayground from "@/lib/myComponents/HtmlCssJsPlayground";
import MCQ from "@/lib/myComponents/MCQ";
import JsPlayground from "@/lib/myComponents/JsPlayground";
// import VisualMockup from "@/lib/myComponents/VisualMockup";
import VisualMockup from "@/lib/myComponents/VisualMockup";
import HtmlJsPlayground from "@/lib/myComponents/HtmlJsPlayground";
import WelcomeSection from "@/lib/myComponents/WelcomeSection";
import DownloadSection from "@/lib/myComponents/DownloadSection";
import Materials from "@/lib/myComponents/Materials";
export default async function DayPage({ params }) {
    const test=await params;
  const { content } = getDayContent(test.day);
  return (
    // <div className="prose dark:prose-invert max-w-3xl mx-auto p-6">
    <div className=" sm:mx-auto md:mx-52 prose mx-0  dark:prose-invert max-w-none px-0 sm:px-4 sm:px-8 md:px-12">

<MDXRemote
  source={content}
  components={{
    Tip,
    Task,
    Divider,
    Table,
    CodeBlock,
    InfoBox,
    Warning,
    Note,
    BrowserMockup,
    HtmlCssPlayground,
    HtmlPlayground,
    MCQ,
    JsPlayground,
    HtmlCssJsPlayground,
    VisualMockup,
    HtmlJsPlayground,
    WelcomeSection,
    DownloadSection,
    Materials
  
      
    
    
  }}
/>
    </div>
  );
}
