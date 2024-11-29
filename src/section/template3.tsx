import { useEffect, useState } from "react";
import { AdvancedType } from "easy-email-core";
import {
  EmailEditor,
  EmailEditorProvider,
  IEmailTemplate,
} from "easy-email-editor";
import { ExtensionProps, StandardLayout } from "easy-email-extensions";
import { useWindowSize } from "react-use";
import { Button, PageHeader, Space, Spin } from "@arco-design/web-react";
import "easy-email-editor/lib/style.css";
import "easy-email-extensions/lib/style.css";
import "@arco-themes/react-easy-email-theme/css/arco.css";
import { Config } from "final-form";
import handler from "./temp3.json";
import { testMergeTags } from "./testMergeTags";

const defaultCategories: ExtensionProps["categories"] = [
  {
    label: "Content",
    active: true,
    blocks: [
      {
        type: AdvancedType.TEXT,
      },
      {
        type: AdvancedType.IMAGE,
        payload: { attributes: { padding: "0px 0px 0px 0px" } },
      },
      {
        type: AdvancedType.BUTTON,
      },
      {
        type: AdvancedType.SOCIAL,
      },
      {
        type: AdvancedType.DIVIDER,
      },
      {
        type: AdvancedType.SPACER,
      },
      {
        type: AdvancedType.HERO,
      },
      {
        type: AdvancedType.WRAPPER,
      },
    ],
  },
  {
    label: "Layout",
    active: true,
    displayType: "column",
    blocks: [
      {
        title: "2 columns",
        payload: [
          ["50%", "50%"],
          ["33%", "67%"],
          ["67%", "33%"],
          ["25%", "75%"],
          ["75%", "25%"],
        ],
      },
      {
        title: "3 columns",
        payload: [
          ["33.33%", "33.33%", "33.33%"],
          ["25%", "25%", "50%"],
          ["50%", "25%", "25%"],
        ],
      },
      {
        title: "4 columns",
        payload: [["25%", "25%", "25%", "25%"]],
      },
    ],
  },
];

export default function them3() {
  const [template, setTemplate] = useState<IEmailTemplate | null>(null);
  const { width } = useWindowSize();
  const smallScene = width < 1400;

  useEffect(() => {
    //@ts-ignore
    setTemplate(handler);
  }, []);

  const onSubmit: Config<IEmailTemplate>["onSubmit"] = (values) => {
    console.log(values);
  };

  if (!template) return <Spin />;

  return (
    <EmailEditorProvider
      data={template}
      height={"calc(100vh - 70px)"}
      autoComplete
      dashed={false}
      mergeTags={testMergeTags}
      mergeTagGenerate={(tag) => `{{${tag}}}`}
      onSubmit={onSubmit}
    >
      {({}, { submit }) => {
        return (
          <>
            <PageHeader
              style={{ background: "var(--color-bg-2)" }}
              title="Edit"
              extra={
                <Space>
                  <Button type="primary" onClick={submit}>
                    Save
                  </Button>
                </Space>
              }
            />
            <StandardLayout
              compact={!smallScene}
              showSourceCode={true}
              categories={defaultCategories}
            >
              <EmailEditor />
            </StandardLayout>
          </>
        );
      }}
    </EmailEditorProvider>
  );
}
