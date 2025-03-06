import { useEffect, useState } from "react";
import { FileState } from "./fileService";

export default function Notification({ fileState }: { fileState: FileState }) {
  const styles = fileStateToStyles(fileState);

  const [rootClasses, setRootClasses] = useState(styles.rootClasses);
  const [fileStateMsg, setFileStateMsg] = useState(styles.message);
  const [progressClasses, setProgressClasses] = useState(
    styles.progressClasses
  );
  const [progress, setProgress] = useState(styles.progress);

  useEffect(() => {
    const styles = fileStateToStyles(fileState);
    setRootClasses(styles.rootClasses);
    setFileStateMsg(styles.message);
    setProgressClasses(styles.progressClasses);
    setProgress(styles.progress);

    if (fileState === "saved") {
      const handle = setTimeout(() => {
        const styles = fileStateToStyles("");
        setRootClasses(styles.rootClasses);
        setProgressClasses(styles.progressClasses);
      }, 1000);

      return () => clearTimeout(handle);
    }
  }, [fileState]);

  return (
    <>
      <div
        className={`transition-all relative self-end -bottom-1.5 h-8 flex -ml-0.5 px-4 rounded-t-sm ${rootClasses}`}
      >
        <div className="flex space-x-3 items-end">
          {/* <div className="inline-grid *:[grid-area:1/1]">
            <div className="status animate-ping"></div>
            <div className="status"></div>
          </div> */}
          <p className="text-sm font-bold tracking-wide pb-1">{fileStateMsg}</p>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-0.5">
        <progress
          className={`transition-all progress ${progressClasses} h-full w-screen absolute -bottom-2 -left-4`}
          value={progress}
          max={100}
        />
      </div>
    </>
  );
}

function fileStateToStyles(fileState: FileState) {
  let rootClasses: string;
  let message: string;
  let progressClasses: string;
  let progress: number | undefined;

  switch (fileState) {
    case "saving":
      rootClasses = "bg-warning text-warning-content opacity-100";
      message = "Saving...";
      progressClasses = "progress-warning opacity-100";
      progress = undefined;
      break;
    case "saved":
      rootClasses = "bg-success text-success-content opacity-100";
      message = "Saved";
      progressClasses = "progress-success opacity-100";
      progress = 100;
      break;
    case "changed":
      rootClasses = "bg-error text-error-content opacity-100";
      message = "*Unsaved Changes";
      progressClasses = "progress-error opacity-100";
      progress = 100;
      break;
    default:
      rootClasses = "bg-neutral text-neutral-content opacity-30";
      message = "Saved";
      progressClasses = "progress-neutral opacity-30";
      progress = 100;
  }

  return {
    rootClasses,
    message,
    progressClasses,
    progress,
  };
}
