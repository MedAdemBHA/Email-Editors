import { useRef } from "react";
import MailUiEditor, {
  MailUiEditorProps,
  MailUiEditorRef,
} from "mailui-editor-react";
import sampleTemplate from "./sampleTemplate.json";

export default function Temp() {
  const mailUiEditorRef = useRef<MailUiEditorRef | null>(null);

  const aboutSection = useRef(null);
  const handleExportHtml = () => {
    //@ts-ignore
    mailUiEditorRef.current?.exportHtml(async (data: any) => {
      const json = data.json;
      const html = data.html;

      console.log(json);
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(html);
    });
  };
  const onLoad: MailUiEditorProps["onLoad"] = (mailui) => {
    console.log("onLoad", mailui);

    mailUiEditorRef.current = mailui;

    mailui?.loadDesign(sampleTemplate);
  };

  return (
    // Try using max width to contain the size of the container
    <section ref={aboutSection} aria-label="about me">
      <button
        className="mb-1 rounded bg-green-500 px-4 py-2 font-bold text-white"
        onClick={handleExportHtml}
      >
        Export HTML
      </button>{" "}
      <MailUiEditor
        ref={mailUiEditorRef}
        onLoad={onLoad}
        options={{
          projectId: 167,
          signature:
            "697d6fe37a4f404ddc20060a89a3d9c8df8712f40c7ba77b0b132181a6038003",
          defaultDevice: "desktop",
          devices: ["desktop", "tablet", "mobile"],
          appearance: {
            panels: {
              tools: {
                dock: "left",
                compact: false,
              },
            },
          },
          features: {
            stockImages: {
              enabled: true,
              safeSearch: true,
              defaultSearchTerm: "people",
            },
            stockLibrary: {
              enabled: true,
              safeFilter: true,
            },
            saveToLibrary: {
              enabled: true,
              authAlert: true,
            },
            displayCondition: {
              enabled: true,
            },
          },
          saveToLibrary: {
            enabled: true,
            authAlert: true,
          },
          excludeTools: [],
          mergeTags: [
            {
              label: "First name",
              value: "{{ first_name }}",
              sample: "Doe",
            },
            {
              label: "Last name",
              value: "{{ last_name }}",
              sample: "Doe",
            },
            {
              label: "Shipping address",
              sample: "Doe",
            },
          ],
          protectedModules: [],
          customTools: [],
        }}
        scriptUrl={"https://editor.mailui.co/embed.min.js"}
        minHeight="calc(100vh - 57px)"
      />
    </section>
  );
}
