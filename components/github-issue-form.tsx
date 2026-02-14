"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  Send,
  MessageSquarePlus,
  X,
  Bug,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitGitHubIssue } from "@/app/actions/github-issue";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface GitHubIssueFormProps {
  articleTitle?: string;
}

export function GitHubIssueForm({ articleTitle }: GitHubIssueFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successUrl, setSuccessUrl] = useState<string>("");

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setSuccessUrl("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const userBody = formData.get("body") as string;

    let fullBody = `**الوصف:**\n${userBody}\n\n`;

    if (articleTitle) {
      fullBody += `**المقال:**\n${articleTitle}\n`;
    }

    const submittingData = new FormData();
    submittingData.append("title", `Issue: ${window.location.href}`);
    submittingData.append("body", fullBody);

    try {
      const result = await submitGitHubIssue(submittingData);

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        setIsSuccess(true);
        setSuccessUrl(result.url || "");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-12 pt-6  border-t flex justify-center w-full" dir="rtl">
      <Drawer
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Bug className="size-4" />
            <span>هل وجدت خطأ؟ ساهم في تحسين المحتوى</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent  dir="rtl">
          <DrawerClose asChild>
            <Button size="icon" className="absolute top-4 left-4 h-8 w-8">
              <X className="size-4" />
              <span className="sr-only">إغلاق</span>
            </Button>
          </DrawerClose>
          <div className="mx-auto w-full max-w-sm">
            {isSuccess ? (
              <div className="p-8 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                  <CheckCircle2 className="size-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">شكرًا لمساهمتك!</h3>
                  <p className="text-muted-foreground text-sm">
                    تم استلام ملاحظاتك بنجاح. نحن نقدر مساعدتك في تحسين المحتوى.
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full pt-4">
                  {successUrl && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(successUrl, "_blank")}
                      className="w-full"
                    >
                      عـرض المشكلة في GitHub
                    </Button>
                  )}
                  <DrawerClose asChild>
                    <Button className="w-full">إغلاق</Button>
                  </DrawerClose>
                </div>
              </div>
            ) : (
              <>
                <DrawerHeader className="text-right">
                  <DrawerTitle>إبلاغ عن مشكلة</DrawerTitle>
                  <DrawerDescription>
                    ساعدنا في تحسين المحتوى من خلال الإبلاغ عن أي أخطاء أو تقديم
                    اقتراحات.
                  </DrawerDescription>
                </DrawerHeader>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="body" className="text-right block">
                      التفاصيل
                    </Label>
                    <Textarea
                      id="body"
                      name="body"
                      placeholder="اشرح المشكلة أو الاقتراح..."
                      required
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          إرسال
                        </>
                      )}
                    </Button>
                    <DrawerClose asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                      >
                        إلغاء
                      </Button>
                    </DrawerClose>
                  </div>
                </form>
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
