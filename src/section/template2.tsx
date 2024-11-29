import { useEffect, useMemo } from "react";
import BeePlugin from "@mailupinc/bee-plugin";
import "../App.css";

import {
  IBeeConfig,
  // IMergeContent,
  // IMergeTag,
  // ISpecialLink,
} from "@mailupinc/bee-plugin/dist/types/bee";

const BEE_TEMPLATE_URL = "https://rsrc.getbee.io/api/templates/m-bee";
const BEEJS_URL = "https://app-rsrc.getbee.io/plugin/BeePlugin.js";
const API_AUTH_URL = "https://auth.getbee.io/apiauth";

const BEE_PLUGIN_CONTAINER_ID = "bee-plugin-container";

// const specialLinks: ISpecialLink[] = [
//   {
//     type: "unsubscribe",
//     label: "SpecialLink.Unsubscribe",
//     link: "http://[unsubscribe]/",
//   },
//   {
//     type: "subscribe",
//     label: "SpecialLink.Subscribe",
//     link: "http://[subscribe]/",
//   },
// ];

// const mergeTags: IMergeTag[] = [
//   {
//     name: "tag 1",
//     value: "[tag1]",
//   },
//   {
//     name: "tag 2",
//     value: "[tag2]",
//   },
// ];

// const mergeContents: IMergeContent[] = [
//   {
//     name: "content 1",
//     value: "[content1]",
//   },
//   {
//     name: "content 2",
//     value: "[content1]",
//   },
// ];

const userInput = (message: string, sample: any) =>
  function handler(resolve: any, reject: any) {
    const data = prompt(message, JSON.stringify(sample));
    return data == null || data === "" ? reject() : resolve(JSON.parse(data));
  };

const contentDialog = {
  filePicker: {
    label: "Picker",
    handler: userInput("Enter image path:", {
      url: "https://d1oco4z2z1fhwp.cloudfront.net/templates/default/113/rocket-color.png",
    }),
  },
  addOn: {
    handler: (resolve: any, args: any) => {
      let content = {};
      const contentDialogId = args.contentDialogId;

      switch (contentDialogId) {
        case "html":
          // HTML addon
          content = {
            type: "html",
            value: {
              html: `
              <div name="customName">Register Now</div>
              `,
            },
          };
          break;
        case "html-row":
          // Row AddOn with Display Condition
          // Simple schema: https://docs.beefree.io/generating-custom-rows-from-existing-content/#simplified-row-schema
          content = {
            type: "rowAddon",
            value: {
              name: "First item",
              columns: [
                {
                  weight: 12,
                  modules: [
                    {
                      type: "image",
                      src: "https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeDemo002/2fdfc2a9-b26e-4eb2-a5f8-54ab44b2594c/waterbottle.png",
                      href: "https://www.beefree.io",
                      alt: "Water bottle",
                      dynamicSrc: "",
                    },
                    {
                      type: "title",
                      text: "Water Bottle",
                    },
                    {
                      type: "paragraph",
                      text: "A sustainable water bottle that uses innovative technology to allow people to access pristine drinking wayter easily and sustainably.",
                    },
                    {
                      type: "button",
                      text: "Buy Now",
                      href: "https://lipsum.com",
                    },
                  ],
                },
              ],
            },
          };
          break;
        default:
          content = {
            type: "button",
            editable: false,
            value: {
              label: "Register Now",
              href: "",
            },
          };
          break;
      }

      resolve(content);
    },
  },
};

const BeefreeSDKInit = () => {
  const beeConfig: IBeeConfig = useMemo(
    () => ({
      uid: "test1-clientside",
      container: BEE_PLUGIN_CONTAINER_ID,

      language: "en-US",
      loadingSpinnerTheme: "dark",
      saveRows: false,
      advancedPermissions: {
        settings: {
          contentAreaWidth: { show: true, locked: true },
        },
      },
      contentDialog,
      addOns: [
        {
          editable: true,
          id: "html",
        },
        {
          editable: true,
          id: "button",
        },
      ],
    }),
    []
  );

  useEffect(() => {
    const beeTest = new BeePlugin();
    const conf = { authUrl: API_AUTH_URL, beePluginUrl: BEEJS_URL };
    beeTest
      .getToken(
        "944d4c42-7aca-499e-b035-dc1f0132ae97",
        "w2I044wMHI3AjQK82UYGjPLXc4Xvs07JjEYUADIXqUoJcerHSutY",
        conf
      )
      .then(() => fetch(new Request(BEE_TEMPLATE_URL, { method: "GET" })))
      .then((res) => res.json())
      .then((template) => {
        beeTest
          .start(beeConfig, template, "", { shared: false })
          .then((instance) => {
            console.log("promise resolve return instance", instance);
          });
      })
      .catch((error) =>
        console.error("error during iniziatialization --> ", error)
      );
  }, [beeConfig]);

  return <div id={BEE_PLUGIN_CONTAINER_ID} className="BeePluginContainer" />;
};

export default BeefreeSDKInit;
