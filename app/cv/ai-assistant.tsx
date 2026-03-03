"use client";

import React, { useState } from "react";
import { Sparkles, Copy, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CVData } from "./types";

export function AIAssistantDialog({ cv, setCV }: { cv: CVData; setCV: React.Dispatch<React.SetStateAction<CVData>> }) {
    const [copied, setCopied] = useState(false);
    const [jsonInput, setJsonInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [language, setLanguage] = useState<"en" | "ar">("en");

    const getPrompt = () => {
        if (language === "ar") {
            return `أنت خبير في كتابة السير الذاتية (CV). أريد منك مساعدتي في كتابة محتوى سيرتي الذاتية بناءً على الدردشة بيننا. ولكن المخرجات النهائية يجب أن تكون بصيغة JSON دقيقة ومحددة لتناسب نظام الموقع الخاص بي.

ملاحظة: محتوى الـ JSON الموجود أدناه هو "بيانات وهمية" فقط للعرض. **لا تستخدم** هذه البيانات الوهمية في سيرتي الذاتية الحقيقية بأي شكل من الأشكال.
بدلاً من ذلك، هدفك هو مساعدتي في بناء سيرة ذاتية جديدة بالكامل من الصفر باستخدام معلوماتي الحقيقية. (ملاحظة: السيرة الذاتية الناتجة في الـ JSON النهائي يجب أن تكون باللغة الإنجليزية، ولكن يمكنك التحدث معي وجمع التفاصيل باللغة العربية).

أولاً، اسألني أسئلة لجمع كل المعلومات المطلوبة في السيرة الذاتية (مثل الخلفية المهنية، الخبرات السابقة، التعليم، المهارات، والمشاريع). اسألني 2 أو 3 أسئلة كحد أقصى في كل رسالة. وإذا كانت المعلومات التي أقدمها قليلة، اطلب المزيد من التفاصيل لتبدو السيرة الذاتية احترافية قوية.

بيانات الـ CV الوهمية الحالية (للمرجعية لمعرفة هيكل البيانات المطلوب فقط، لا تستخدم البيانات نفسها):
${JSON.stringify(cv, null, 2)}

عندما ننتهي من جمع المعلومات وأقول لك "هذه كل التفاصيل" أو "قم بتوليد السيرة الذاتية"، **يجب عليك** استخراج محتوى السيرة الذاتية ككود JSON بنسق ثابت ومطابق لتركيبة البيانات أدناه داخل كود بلوك \`\`\`json. لا تضف أي نصوص أو شروحات بعد كتلة الـ JSON.

إليك التركيبة الدقيقة لملف الـ JSON التي **يجب** الالتزام بها:
{
  "name": "الاسم الكامل",
  "titleLine": "المسمى الوظيفي (مثل Frontend Web Developer)",
  "phone": "رقم الهاتف",
  "location": "المدينة، البلد",
  "email": "email@example.com",
  "links": [
    { "id": "1", "label": "LinkedIn", "href": "https://..." }
  ],
  "summary": "نبذة احترافية...",
  "skillsTitle": "المهارات والتقنيات",
  "skills": [
    { "id": "1", "label": "اسم الفئة", "value": "المهارات مفصولة بفواصل" }
  ],
  "expTitle": "الخبرات العملية",
  "jobs": [
    {
      "id": "1",
      "title": "المنصب | الشركة (السنة - السنة)",
      "bullets": [
        { "id": "1", "text": "نص النقطة الواحدة للخبرة" }
      ]
    }
  ],
  "projTitle": "أبرز المشاريع",
  "projects": [
    {
      "id": "1",
      "name": "اسم المشروع",
      "links": [
        { "id": "1", "label": "github", "href": "https://..." }
      ],
      "description": "وصف قصير للمشروع",
      "bullets": [
        { "id": "1", "text": "نص النقطة الخاصة بالمشروع" }
      ]
    }
  ],
  "eduTitle": "التعليم",
  "education": [
    { "id": "1", "text": "الدرجة من الجامعة (السنة - السنة)" }
  ],
  "langTitle": "اللغات",
  "languages": [
    { "id": "1", "text": "اللغة (مستوى الإتقان)" }
  ]
}

تأكد من أن جميع الحقول 'id' عبارة عن أرقام أونصوص قصيرة فريدة (مثل "1" و "2" الخ). النظام سيقوم بقراءة هذا الـ JSON مباشرة. وفر فقط الـ JSON في نهاية رسالتك كما هو مطلوب بداخل كود بلوك.`;
        }

        return `You are an expert CV and resume writer. I need your help writing my CV content based on our conversation, but the final output MUST be in a precise JSON format that my application expects.

The JSON data below is JUST MOCK DATA currently in the system. YOU MUST NOT USE THIS MOCK DATA for my actual CV.
Instead, your goal is to help me build a COMPLETELY NEW CV from scratch using MY REAL information.

First, ask me questions to gather all the necessary information for my CV (such as my background, experience, education, skills, and projects). Ask me 2-3 questions at a time max. If I don't give you enough information, ask for more details to make the CV sound professional and impactful.

Current mock CV data (DO NOT USE THIS DATA, just use it as a reference for the required structure):
${JSON.stringify(cv, null, 2)}

Once we are DONE and I tell you that's all the info, or if I say "generate my CV", you MUST output the CV content as a valid, raw JSON object matching the exact format below, enclosed in a \`\`\`json code block. Do not include any other text after the JSON block.

Here is the exact JSON structure you MUST match:
{
  "name": "Full Name",
  "titleLine": "Job Title (e.g., Frontend Web Developer)",
  "phone": "Phone number",
  "location": "City, Country",
  "email": "email@example.com",
  "links": [
    { "id": "1", "label": "LinkedIn", "href": "https://..." }
  ],
  "summary": "Professional summary...",
  "skillsTitle": "Skills & Technologies",
  "skills": [
    { "id": "1", "label": "Category Name", "value": "Comma separated skills" }
  ],
  "expTitle": "Work Experience",
  "jobs": [
    {
      "id": "1",
      "title": "Role | Company (Year - Year)",
      "bullets": [
        { "id": "1", "text": "Bullet point text" }
      ]
    }
  ],
  "projTitle": "Featured Projects",
  "projects": [
    {
      "id": "1",
      "name": "Project Name",
      "links": [
        { "id": "1", "label": "github", "href": "https://..." }
      ],
      "description": "Short project intro",
      "bullets": [
        { "id": "1", "text": "Bullet point text" }
      ]
    }
  ],
  "eduTitle": "Education",
  "education": [
    { "id": "1", "text": "Degree from University (Year - Year)" }
  ],
  "langTitle": "Languages",
  "languages": [
    { "id": "1", "text": "Language (Proficiency)" }
  ]
}

Ensure all 'id' fields are short unique strings (like "1", "2", "3", etc.). Ensure all values are strings or arrays as shown. The application will parse this JSON. Provide ONLY the JSON inside a markdown code block at the end.`;
    };

    const promptText = getPrompt();

    const handleCopy = () => {
        navigator.clipboard.writeText(promptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleApply = () => {
        try {
            setError(null);
            // Quick extraction of JSON if it's inside markdown code blocks
            const jsonStrMatch = jsonInput.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            const strToParse = jsonStrMatch ? jsonStrMatch[1] : jsonInput;

            const parsed = JSON.parse(strToParse.trim());
            // Basic validation
            if (!parsed.name || !Array.isArray(parsed.jobs)) {
                throw new Error("Invalid CV format received. Did you paste the correct JSON?");
            }
            // All good
            setCV(parsed as CVData);
            setJsonInput(""); // Clear after success
            alert("Success! Your CV has been updated with the AI content.");
        } catch (e: any) {
            setError(e.message || "Failed to parse JSON. Please check your input.");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 text-xs h-8">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    AI Builder
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        AI CV Builder
                    </DialogTitle>
                    <DialogDescription>
                        Generate a professional CV using Claude or ChatGPT. Chat with the AI, and paste the resulting JSON below.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Step 1 */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                                <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">1</span>
                                Copy the AI Prompt
                            </h4>
                            <Tabs value={language} onValueChange={(v) => setLanguage(v as "en" | "ar")} className="w-[180px]">
                                <TabsList className="grid w-full grid-cols-2 h-8">
                                    <TabsTrigger value="en" className="text-xs">English (Best)</TabsTrigger>
                                    <TabsTrigger value="ar" className="text-xs">Arabic</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="relative">
                            <div className="bg-muted p-3 rounded-md text-xs font-mono h-[120px] overflow-y-auto text-muted-foreground whitespace-pre-wrap">
                                {promptText}
                            </div>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="absolute top-2 right-2 h-7"
                                onClick={handleCopy}
                            >
                                {copied ? <Check className="w-3.5 h-3.5 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                                {copied ? "Copied!" : "Copy Prompt"}
                            </Button>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                            <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">2</span>
                            Paste to Claude
                        </h4>
                        <p className="text-xs text-muted-foreground">
                            Open an AI assistant, paste the copied prompt, and chat with it to build your CV.
                        </p>
                        <Button variant="outline" size="sm" asChild className="w-full">
                            <a href="https://claude.ai/new" target="_blank" rel="noopener noreferrer">
                                Open Claude <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                            </a>
                        </Button>
                    </div>

                    {/* Step 3 */}
                    <div className="space-y-3">
                        <h4 className="font-semibold text-sm flex items-center gap-2">
                            <span className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">3</span>
                            Apply the Result
                        </h4>
                        <p className="text-xs text-muted-foreground">
                            Once the AI gives you the final JSON block, copy and paste it here to update your CV.
                        </p>
                        <Textarea
                            placeholder="Paste your JSON here..."
                            className="font-mono text-xs h-[150px] resize-none"
                            value={jsonInput}
                            onChange={(e) => setJsonInput(e.target.value)}
                        />
                        {error && (
                            <p className="text-xs text-destructive font-medium">{error}</p>
                        )}
                        <Button
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-0"
                            disabled={!jsonInput.trim()}
                            onClick={handleApply}
                        >
                            Apply to CV
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
