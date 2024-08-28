import { MDXProvider } from "@mdx-js/react";

const components: React.ComponentProps<typeof MDXProvider>["components"] = {
  //   li: (props) => <li className="float-left inline ml-[2px" {...props} />,
  ol: (props) => <ol className="list-decimal pl-[2em]" {...props} />,
  ul: (props) => <ul className="list-disc pl-[2em]" {...props} />,
  p: (props) => <p className="my-[.5em]" {...props} />,
};

export default components;
